import Taro, { useState } from "@tarojs/taro";
import "./Index.less";
import { View,Image,Text } from "@tarojs/components";

const MiniPlayer = function(props) {
  return (
    <View>
      <View className="icon">
        <View className="imgWrpper">
          <Image className="play" src={song.alpicUrl}></Image>
        </View>
      </View>
      <View className="text">
        <View className="name">{song.name}</View>
        <p className="desc">{getName(song.ar)}</p>
      </View>
      <View className="control">
        <Text className="iconfont icon-stop"></Text>
      </View>
      <View className="control">
        <Text className="iconfont icon-liebiao"></Text>
      </View>
    </View>
  );
};

export default MiniPlayer;
