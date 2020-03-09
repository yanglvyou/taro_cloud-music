import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './index.less'


@connect(({ appGlobal }) => ({
  arr:appGlobal.arr
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  },
  bannerList(){

  }
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    // this.props.dispatch({type:"appGlobal/fetchBannerList"})
    this.props.dispatch({
      type: "appGlobal/fetchBannerList"
    });
   }

  componentDidHide () { }

  render () {
    console.log(this.props.arr,6666666666);
    return (
      <View className='index'>
         首页
      </View>
    )
  }
}

export default Index
