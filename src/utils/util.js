import Taro from "@tarojs/taro";

const NAVIGATOR_HEIGHT = 44;
const TAB_BAR_HEIGHT = 50;

/**
 * 返回屏幕可用高度
 * // NOTE 各端返回的 windowHeight 不一定是最终可用高度（例如可能没减去 statusBar 的高度），需二次计算
 * @param {*} showTabBar
 */
export function getWindowHeight(showTabBar = true) {
  const info = Taro.getSystemInfoSync();
  const { windowHeight, statusBarHeight, titleBarHeight } = info;
  const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0;

  if (process.env.TARO_ENV === "rn") {
    return windowHeight - statusBarHeight - NAVIGATOR_HEIGHT - tabBarHeight;
  }

  if (process.env.TARO_ENV === "h5") {
    return `${windowHeight - tabBarHeight}px`;
  }

  if (process.env.TARO_ENV === "alipay") {
    // NOTE 支付宝比较迷，windowHeight 似乎是去掉了 tabBar 高度，但无 tab 页跟 tab 页返回高度是一样的
    return `${windowHeight -
      statusBarHeight -
      titleBarHeight +
      (showTabBar ? 0 : TAB_BAR_HEIGHT)}px`;
  }

  return `${windowHeight}px`;
}

export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

export const getName = list => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

// 格式化播放次数
export const formatCount = (times) => {
  let formatTime=0;
  times = times ? Number(times) : 0
  switch (true) {
    case times > 100000000 :
      formatTime = `${(times / 100000000).toFixed(1)}亿`
      break
    case times > 100000 :
        formatTime = `${(times / 10000).toFixed(1)}万`
        break
    default:
      formatTime = times
  }
  return formatTime
}


// 转换歌词字符串为数组
export const parse_lrc = (lrc_content) => {
  let now_lrc=[];
  let lrc_text=[];
  let lrc_sec=[];
  let lrc_row= lrc_content.split("\n"); // 将原始的歌词通过换行符转为数组
  let scroll = true; // 默认scroll初始值为true
  for (let i in lrc_row) {
    if ((lrc_row[i].indexOf(']') === -1) && lrc_row[i]) {
      now_lrc.push({ lrc_text: lrc_row[i] })
    } else if (lrc_row[i] !== '') {
      let tmp= lrc_row[i].split("]")
      for (let j in tmp) {
        scroll = false
        let tmp2= tmp[j].substr(1, 8)
        let tmp3 = tmp2.split(":")
        let lrc_sec= Number(tmp3[0] * 60 + Number(tmp3[1]))
        if (lrc_sec && (lrc_sec > 0)) {
          let lrc = (tmp[tmp.length - 1]).replace(/(^\s*)|(\s*$)/g, "")
          lrc && now_lrc.push({ lrc_sec: lrc_sec, lrc_text: lrc })
        }
      }
    }
  }
  if (!scroll) {
    now_lrc.sort(function (a, b){
      return a.lrc_sec - b.lrc_sec;
    });
  }
  return {
    now_lrc: now_lrc,
    scroll: scroll
  };
}

//转换歌曲播放时间
export const formatPlayTime = interval => {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};
