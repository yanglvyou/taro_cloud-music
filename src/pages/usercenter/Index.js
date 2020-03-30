import Taro,{useState,useDidShow} from "@tarojs/taro";
import { View } from "@tarojs/components";



const Index=(props)=>{
   const userInfo=Taro.getStorageSync("userInfo");
   console.log('userInfo: ', userInfo);
   useDidShow(()=>{
     if(!userInfo){
       Taro.navigateTo({url:"/pages/login/Index"})
     }
   })

  return (
    <View>111111111</View>
  )
}

export default Index;
