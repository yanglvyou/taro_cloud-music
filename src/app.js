import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import "taro-ui/dist/style/index.scss";
import dva from "./utils/dva";
import models from "./models";
import Index from "./pages/index/Index";
import "./app.less";

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {
  config = {
    pages: [
      "pages/index/Index",
      "pages/singer/Index",
      "pages/rank/Index",
      "pages/usercenter/Index",
      "pages/detail/Index",
      "pages/skeleton/Index",
      "pages/singersDetail/Index",
      "pages/canvas/Index",
      "pages/canvas_demo1/Index",
      "pages/input-emoji/Index",
      "pages/login/Index",
      "pages/recentPlay/Index"
      // "pages/canvas_demo3/Index",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#d44439",
      navigationBarTitleText: "taro",
      navigationBarTextStyle: "white",
      // navigationStyle: "custom"
    },
    tabBar: {
      // "selectedColor": "#d44439", //颜色
      list: [
        {
          pagePath: "pages/index/Index",
          text: "推荐",
          iconPath: "./assets/images/tabbar/store.png",
          selectedIconPath: "./assets/images/tabbar/store-active.png"
        },
        {
          pagePath: "pages/singer/Index",
          text: "歌手",
          iconPath: "./assets/images/tabbar/store.png",
          selectedIconPath: "./assets/images/tabbar/store-active.png"
        },
        {
          pagePath: "pages/rank/Index",
          text: "排行榜",
          iconPath: "./assets/images/tabbar/cate.png",
          selectedIconPath: "./assets/images/tabbar/cate-active.png"
        },
        {
          pagePath: "pages/usercenter/Index",
          text: "我的",
          iconPath: "./assets/images/tabbar/user.png",
          selectedIconPath: "./assets/images/tabbar/user-active.png"
        }
      ]
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
