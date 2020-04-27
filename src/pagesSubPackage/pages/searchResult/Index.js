import Taro, { useState, useRouter,useEffect } from "@tarojs/taro";
import { View } from "@tarojs/components";

function Index(props) {
  const { params } = useRouter();
  const keywords=params.keyword;
  useEffect(()=>{
    Taro.setNavigationBarTitle({title:`${keywords}的搜索结果`})
  },[keywords])
  return <View>未开发</View>;
}

Index.config={
  navigationBarTitleText:"数据加载中..."
}
export default Index;
