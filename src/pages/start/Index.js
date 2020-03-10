import Taro, { Component } from "@tarojs/taro";
import { View, Button,Text, Image } from "@tarojs/components";
import "./Index.less";

export default class Index extends Component {
  componentDidMount() {}
  render() {
    return (
      <View className="container">
        <div class="box">
          <div class="heart">
            <div class="h-line-0"></div>
            <div class="h-line-1"></div>
            <div class="h-line-2"></div>
            <div class="h-line-3"></div>
            <div class="h-line-4"></div>
            <div class="h-line-5"></div>
            <div class="h-line-6"></div>
            <div class="h-line-7"></div>
            <div class="h-line-8"></div>
          </div>
        </div>
        <Button class="btn btn-gradient" onClick={()=>{
          Taro.navigateTo({url:'/pages/index/index'})
        }}>进入Taro小程序</Button>
      </View>
    );
  }
}

{
  /*<View class="container">
        <View class="spinner">
          <Image
            class="double-bounce1"
            mode="widthFix"
            src={require('../../assets/images/logo.jpg')}
          />
          <Image
            class="double-bounce2"
            mode="widthFix"
            src={require('../../assets/images/logo.jpg')}
          />
        </View>
    </View>*/
}
