import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import "./index.less";

@connect(
  ({ appGlobal }) => ({
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    },
    bannerList() {}
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: "歌手"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    // this.props.dispatch({type:"appGlobal/fetchBannerList"})
    this.props.dispatch({
      type: "appGlobal/fetchBannerList"
    });
  }

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        首页 <Text className="iconfont icon-shanchu"></Text>
      </View>
    );
  }
}

export default Index;
