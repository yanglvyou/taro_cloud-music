import Taro from "@tarojs/taro";
/** 获取最大高度 */

export const getHeight = config => {
  //文本高度
  const getTextHeight = text => {
    let fontHeight = text.lineHeight || text.fontSize;
    let height = 0;
    if (text.baseLine === "top") {
      height = fontHeight;
    } else if (text.baseLine === "middle") {
      height = fontHeight / 2;
    } else {
      height = 0;
    }
    return height;
  };
  const heightArr= [];
  (config.blocks || []).forEach(item => {
    heightArr.push(item.y + item.height);
  });
  (config.texts || []).forEach(item => {
    let height;
    height = getTextHeight(item);
    heightArr.push(item.y + height);
  });
  (config.images || []).forEach(item => {
    heightArr.push(item.y + item.height);
  });
  (config.lines || []).forEach(item => {
    heightArr.push(item.startY);
    heightArr.push(item.endY);
  });
  const sortRes = heightArr.sort((a, b) => b - a);
  let canvasHeight = 0;
  if (sortRes.length > 0) {
    canvasHeight = sortRes[0];
  }
  if (config.height < canvasHeight || !config.height) {
    return canvasHeight;
  } else {
    return config.height;
  }
};


  /**
* @description 下载图片并获取图片信息
* @param  {} image
* @param  {} index
* @returns  { Promise }
*/
export function downloadImageAndInfo(image, index, toRpxFunc, pixelRatio) {
  return new Promise((resolve, reject) => {
    const { x, y, url, zIndex } = image;
    const imageUrl = url;
    // 下载图片
    downImage(imageUrl)
      // 获取图片信息
      .then(imgPath => getImageInfo(imgPath, index))
      .then(({ imgPath, imgInfo }) => {
        // 根据画布的宽高计算出图片绘制的大小，这里会保证图片绘制不变形
        let sx;
        let sy;
        const borderRadius = image.borderRadius || 0;
        const setWidth = image.width;
        const setHeight = image.height;
        const width = toRpxFunc(imgInfo.width / pixelRatio);
        const height = toRpxFunc(imgInfo.height / pixelRatio);

        if (width / height <= setWidth / setHeight) {
          sx = 0;
          sy = (height - ((width / setWidth) * setHeight)) / 2;
        } else {
          sy = 0;
          sx = (width - ((height / setHeight) * setWidth)) / 2;
        }
        let result = {
          type: 'image',
          borderRadius,
          borderWidth: image.borderWidth,
          borderColor: image.borderColor,
          zIndex: typeof zIndex !== 'undefined' ? zIndex : index,
          imgPath,
          sx,
          sy,
          sw: (width - (sx * 2)),
          sh: (height - (sy * 2)),
          x,
          y,
          w: setWidth,
          h: setHeight,
        }
        resolve(result);
      })
      .catch(err => {
        console.log(err);
        reject(err)
      });
  });
}

/**
 * 下载图片资源
 * @param { string } imageUrl
 * @returns  { Promise }
 */
export function downImage(imageUrl) {
  return new Promise((resolve, reject) => {
    if (
      /^http/.test(imageUrl) &&
      // env.USER_DATA_PATH 文件系统中的用户目录路径
      !new RegExp(wx.env.USER_DATA_PATH).test(imageUrl)
    ) {
      Taro.downloadFile({
        url: (imageUrl),
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath);
          } else {
            reject(res.errMsg);
          }
        },
        fail(err) {
          reject(err);
        },
      });
    } else {
      // 支持本地地址
      resolve(imageUrl);
    }
  });
}

/**
 * 获取图片信息
 * @param {*} imgPath
 * @param {*} index
 * @returns  { Promise }
 */
export function getImageInfo(imgPath, index) {
  return new Promise((resolve, reject) => {
    Taro.getImageInfo({//获取图片信息。网络图片需先配置download域名才能生效。
      src: imgPath
    })
      .then(res => {
        resolve({
          imgPath,
          imgInfo: res,
          index
        });
      })
      .catch(err => {
        reject(err);
      })
  });
}
