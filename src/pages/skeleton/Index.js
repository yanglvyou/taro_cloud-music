import Taro, { useState } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Skeleton from "../../components/skeleton/Index";

function Index(props) {
  return (
    <View>
      <Skeleton num={10} loading={true}></Skeleton>
    </View>
  );
}

export default Index;
