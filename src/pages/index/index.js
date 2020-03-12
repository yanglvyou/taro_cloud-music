import Taro, { useEffect } from "@tarojs/taro";
import { View, Button, ScrollView, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import CustomNavigation from "../../components/customNavigation/Index";
import Banner from "../../components/banner/Index";
import RecommendList from "../../components/recommendList/Index";
import { getWindowHeight } from "../../utils/util";

import "./Index.less";

function Index(props) {
  const { bannerList, recommendList, onGetBanner, onGetRecommendList } = props;
  useEffect(() => {
    onGetBanner();
    onGetRecommendList();
  }, []);

  const height = getWindowHeight(true);
  console.log(bannerList, recommendList, 44444444);
  return (
    <View className="recommendIndex">
      <CustomNavigation background="#d44439" searchBar></CustomNavigation>
      <ScrollView scrollY style={{ height }}>
        <View className="bannerWrap">
          <Banner bannerList={bannerList}></Banner>
        </View>
        <View className="recommendListWrap">
          <RecommendList recommendList={recommendList}></RecommendList>
        </View>
        <Text className="txt">首页 鞍山市所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所</Text><Text className="iconfont icon-shanchu"></Text>
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  const { bannerList, recommendList } = state.recommendIndex;
  return { bannerList, recommendList };
}
function mapDispatchToProps(dispatch) {
  return {
    onGetBanner() {
      dispatch({ type: "recommendIndex/fetchBannerList" });
    },
    onGetRecommendList() {
      dispatch({ type: "recommendIndex/fetchRecommendList" });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
