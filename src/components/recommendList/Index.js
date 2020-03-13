import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./Index.less";

const RecommendList = props => {
  const { recommendList } = props;
  return (
    <View className="listWrap">
      <Text className="listWrap__title">推荐歌单</Text>
      <View className="listWrap__recommend">
        {recommendList.map((item, index) => {
          return (
            <View className="listWrap__recommendList" key={index}>
              <View className="listWrap__imgWrap">
                <Image className="listWrap__img" src={item.picUrl}></Image>
              </View>
              <View className="listWrap__desc">
               <Text className="listWrap__name">{item.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

RecommendList.defaultProps = {
  recommendList: []
};

export default RecommendList;
