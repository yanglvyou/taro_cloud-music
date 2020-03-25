import Taro, { useState } from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import TaroCanvasDrawer from "../../components/taro-canvas/Index";

const CanvasDemo2 = props => {
  canvasDrawFunc = (config = props.rssConfig) => {
    this.setState({
      canvasStatus: true,
      config: config
    });
    Taro.showLoading({
      title: "绘制中..."
    });
  };

  onCreateSuccess = result => {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading();
    if (errMsg === "canvasToTempFilePath:ok") {
      this.setState({
        shareImage: tempFilePath,
        canvasStatus: false,
        config: null
      });
    } else {
      this.setState({
        canvasStatus: false,
        config: null
      });
      Taro.showToast({ icon: "none", title: errMsg || "出现错误" });
      console.log(errMsg);
    }
    // 预览
    // Taro.previewImage({
    //   current: tempFilePath,
    //   urls: [tempFilePath]
    // })
  };

  onCreateFail = error => {
    Taro.hideLoading();
    this.setState({
      canvasStatus: false,
      config: null
    });
    console.log("onCreateFail");
    console.log(error);
  };

  saveToAlbum = async () => {
    // 保存图片至本地
    const res = await Taro.saveImageToPhotosAlbum({
      filePath: this.state.shareImage
    });
    if (res.errMsg === "saveImageToPhotosAlbum:ok") {
      Taro.showToast({
        title: "保存图片成功",
        icon: "success",
        duration: 2000
      });
    }
  };

  reset = () => {
    this.setState({
      shareImage: null,
      canvasStatus: false
    });
  };

  return (
    <View className="shareImage-cont">
      <Image
        className="shareImage"
        src={this.state.shareImage}
        mode="widthFix"
        lazy-load
      />
      {this.state.canvasStatus && (
        <TaroCanvasDrawer
          config={this.state.config}
          onCreateSuccess={this.onCreateSuccess}
          onCreateFail={this.onCreateFail}
        />
      )}

      <Button>点击生成海报</Button>
    </View>
  );
};

CanvasDemo2.defaultProps = {
  jdConfig: {
    width: 750,
    height: 1334,
    backgroundColor: "#fff",
    debug: false,
    pixelRatio: 2,
    blocks: [
      {
        width: 690,
        height: 808,
        x: 30,
        y: 183,
        borderWidth: 2,
        borderColor: "#f0c2a0",
        borderRadius: 20
      },
      {
        width: 634,
        height: 74,
        x: 59,
        y: 770,
        backgroundColor: "#fff",
        opacity: 0.5,
        zIndex: 100
      }
    ],
    texts: [
      {
        x: 113,
        y: 61,
        baseLine: "middle",
        text: "伟仔",
        fontSize: 32,
        color: "#8d8d8d"
      },
      {
        x: 30,
        y: 113,
        baseLine: "top",
        text: "发现一个好物，推荐给你呀",
        fontSize: 38,
        color: "#080808"
      },
      {
        x: 92,
        y: 810,
        fontSize: 38,
        baseLine: "middle",
        text: "标题标题标题标题标题标题标题标题标题",
        width: 570,
        lineNum: 1,
        color: "#8d8d8d",
        zIndex: 200
      },
      {
        x: 59,
        y: 895,
        baseLine: "middle",
        text: [
          {
            text: "2人拼",
            fontSize: 28,
            color: "#ec1731"
          },
          {
            text: "¥99",
            fontSize: 36,
            color: "#ec1731",
            marginLeft: 30
          }
        ]
      },
      {
        x: 522,
        y: 895,
        baseLine: "middle",
        text: "已拼2件",
        fontSize: 28,
        color: "#929292"
      },
      {
        x: 59,
        y: 945,
        baseLine: "middle",
        text: [
          {
            text: "商家发货&售后",
            fontSize: 28,
            color: "#929292"
          },
          {
            text: "七天退货",
            fontSize: 28,
            color: "#929292",
            marginLeft: 50
          },
          {
            text: "运费险",
            fontSize: 28,
            color: "#929292",
            marginLeft: 50
          }
        ]
      },
      {
        x: 360,
        y: 1065,
        baseLine: "top",
        text: "长按识别小程序码",
        fontSize: 38,
        color: "#080808"
      },
      {
        x: 360,
        y: 1123,
        baseLine: "top",
        text: "超值好货一起拼",
        fontSize: 28,
        color: "#929292"
      }
    ],
    images: [
      {
        width: 62,
        height: 62,
        x: 30,
        y: 30,
        borderRadius: 62,
        url:
          "https://s.newscdn.cn/file/2019/09/108f81fd-4e0b-4317-87fb-7b4c23264767.jpg"
      },
      {
        width: 634,
        height: 634,
        x: 59,
        y: 210,
        url:
          "https://s.newscdn.cn/file/2019/09/9881fa55-65f7-430b-b335-671d1c4febd6.jpg"
      },
      {
        width: 220,
        height: 220,
        x: 92,
        y: 1020,
        url: "https://pic.juncao.cc/cms/images/minapp.jpg"
      },
      {
        width: 750,
        height: 90,
        x: 0,
        y: 1244,
        url:
          "https://s.newscdn.cn/file/2019/05/f91ad75e-d1db-44f6-9bd5-71a44fc74971.jpg"
      }
    ],
    lines: []
  }
};

export default CanvasDemo2;
