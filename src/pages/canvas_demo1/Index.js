import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, ScrollView } from "@tarojs/components";
import TaroCanvasDrawer from "../../components/taro-canvas/Index";
import { getWindowHeight } from "../../utils/util";

import "./Index.less";

class TaroCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: null,
      shareImage: null,
      canvasStatus: false,
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
      },
      demoConfig: {
        width: 750,
        height: 1000,
        backgroundColor: "#fff",
        debug: false,
        pixelRatio: 1,
        blocks: [
          {
            x: 0,
            y: 10,
            width: 750, // 如果内部有文字，由文字宽度和内边距决定
            height: 120,
            paddingLeft: 0,
            paddingRight: 0,
            borderWidth: 10,
            borderColor: "red",
            backgroundColor: "blue",
            borderRadius: 40,
            text: {
              text: [
                {
                  text: "金额¥ 1.00",
                  fontSize: 80,
                  color: "yellow",
                  opacity: 1,
                  marginLeft: 50,
                  marginRight: 10
                },
                {
                  text: "金额¥ 1.00",
                  fontSize: 20,
                  color: "yellow",
                  opacity: 1,
                  marginLeft: 10,
                  textDecoration: "line-through"
                }
              ],
              baseLine: "middle"
            }
          }
        ],
        texts: [
          {
            x: 0,
            y: 180,
            text: [
              {
                text: "长标题长标题长标题长标题长标题长标题长标题长标题长标题",
                fontSize: 40,
                color: "red",
                opacity: 1,
                marginLeft: 0,
                marginRight: 10,
                width: 200,
                lineHeight: 40,
                lineNum: 2
              },
              {
                text: "原价¥ 1.00",
                fontSize: 40,
                color: "blue",
                opacity: 1,
                marginLeft: 10,
                textDecoration: "line-through"
              }
            ],
            baseLine: "middle"
          },
          {
            x: 10,
            y: 330,
            text: "金额¥ 1.00",
            fontSize: 80,
            color: "blue",
            opacity: 1,
            baseLine: "middle",
            textDecoration: "line-through"
          }
        ],
        images: [
          {
            url:
              "https://lc-I0j7ktVK.cn-n1.lcfile.com/02bb99132352b5b5dcea.jpg",
            width: 300,
            height: 300,
            y: 450,
            x: 0
            // borderRadius: 150,
            // borderWidth: 10,
            // borderColor: 'red',
          },
          {
            url:
              "https://lc-I0j7ktVK.cn-n1.lcfile.com/02bb99132352b5b5dcea.jpg",
            width: 100,
            height: 100,
            y: 450,
            x: 400,
            borderRadius: 100,
            borderWidth: 10
          }
        ],
        lines: [
          {
            startY: 800,
            startX: 10,
            endX: 300,
            endY: 800,
            width: 5,
            color: "red"
          }
        ]
      },
      rssConfig: {
        width: 750,
        height: 750,
        backgroundColor: "#fff",
        debug: false,
        pixelRatio: 2,
        "hide-loading": false,
        blocks: [
          {
            x: 0,
            y: 0,
            width: 750,
            height: 850,
            paddingLeft: 0,
            paddingRight: 0,
            borderWidth: 0,
            borderColor: "red",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: 0
          },
          {
            x: 40,
            y: 40,
            width: 670,
            height: 770,
            paddingLeft: 0,
            paddingRight: 0,
            borderWidth: 2,
            borderColor: "red",
            backgroundColor: "#fff",
            borderRadius: 12
          }
        ],
        texts: [
          {
            x: 80,
            y: 620,
            text: "三亚贵妃芒,【福返】被阳光吻过的芒香",
            fontSize: 32,
            color: "#000",
            opacity: 1,
            baseLine: "middle",
            lineHeight: 48,
            lineNum: 2,
            textAlign: "left",
            width: 580,
            zIndex: 999
          },
          {
            x: 80,
            y: 760,
            text: "长按扫描二维码阅读完整内容",
            fontSize: 24,
            color: "#666",
            opacity: 1,
            baseLine: "middle",
            textAlign: "left",
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999
          },
          {
            x: 80,
            y: 710,
            text: "分享来自 「 真的有料 」",
            fontSize: 24,
            color: "#666",
            opacity: 1,
            baseLine: "middle",
            textAlign: "left",
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999
          }
        ],
        images: [
          {
            url: "https://img.zhendeyouliao.com/Product/20031018180047101.jpg",
            width: 670,
            height: 620,
            y: 40,
            x: 40,
            borderRadius: 12,
            zIndex: 10
            // borderRadius: 150,
            // borderWidth: 10,
            // borderColor: 'red',
          },
          {
            url: "https://pic.juncao.cc/cms/images/minapp.jpg",
            width: 100,
            height: 100,
            y: 700,
            x: 560,
            borderRadius: 100,
            borderWidth: 0,
            zIndex: 10
          }
        ],
        lines: [
          {
            startY: 680,
            startX: 80,
            endX: 670,
            endY: 681,
            width: 1,
            color: "#ccc"
          }
        ]
      }
    };
  }

  canvasDrawFunc = (config = this.state.rssConfig) => {
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
    console.log("onCreateSuccess");
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

  onPosterSuccess() {
    Taro.previewImage({
      current: this.state.shareImage,
      urls: [this.state.shareImage]
    });
  }

  reset = () => {
    this.setState({
      shareImage: null,
      canvasStatus: false
    });
  };

  render() {
    const height = getWindowHeight(true);
    return (
      <View className="index">
        <ScrollView scrollY style={{height}}>
          <View className="shareImage-cont">
            <Image
              className="shareImage"
              src={this.state.shareImage}
              onClick={this.onPosterSuccess.bind(this)}
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

            <Button
              className="btn btn-gradient"
              onClick={
                !this.state.shareImage
                  ? this.canvasDrawFunc.bind(this, this.state.rssConfig)
                  : this.saveToAlbum.bind(this)
              }
            >
              {!this.state.shareImage ? "绘制海报" : "保存到相册"}
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TaroCanvas;
