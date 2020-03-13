import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./Index.less";

const Loading = () => {
  return (
    <View className="loadingWrap">
      <View className="loading debunce1"></View>
      <View className="loading debunce2"></View>
    </View>
  );
};

export default Loading;
