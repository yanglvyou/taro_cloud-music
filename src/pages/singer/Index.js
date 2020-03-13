import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import CustomNavigation from "../../components/customNavigation/Index";
import HorizenItem from '../../components/horizen-item/Index';
import {categoryTypes,alphaTypes} from '../../api/data';

import "./index.less";

@connect(
  ({ appGlobal }) => ({}),
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
      <View className="user">
        <CustomNavigation background="#d44439" searchBar></CustomNavigation>
        <ScrollView scrollY className="user__wrap">
        <HorizenItem list={categoryTypes} title="分类(默认热门)" oldVal={alphaTypes}></HorizenItem>
          首页 <Text className="iconfont icon-shanchu"></Text>
        </ScrollView>
      </View>
    );
  }
}

export default Index;
