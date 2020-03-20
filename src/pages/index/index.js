import Taro, { useEffect } from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import CustomNavigation from "../../components/customNavigation/Index";
import Banner from "../../components/banner/Index";
import RecommendList from "../../components/recommendList/Index";
import Loading from "../../components/Loading/Index";
import { getWindowHeight } from "../../utils/util";
import { navigateTo } from "../../utils/navigate";

import "./Index.less";

function Index(props) {
  const {
    bannerList,
    recommendList,
    enterLoading,
    onGetBanner,
    onGetRecommendList,
    changeEnterLoading
  } = props;
  useEffect(() => {
    onGetBanner();
    onGetRecommendList();
    changeEnterLoading();
  }, []);

  const height = getWindowHeight(true);
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
        {enterLoading && <Loading></Loading>}
      </ScrollView>
    </View>
  );
}

Index.config={
  navigationStyle:"custom"
}

function mapStateToProps(state) {
  const { bannerList, recommendList, enterLoading } = state.recommendIndex;
  return { bannerList, recommendList, enterLoading };
}
function mapDispatchToProps(dispatch) {
  return {
    onGetBanner() {
      dispatch({ type: "recommendIndex/fetchBannerList" });
    },
    onGetRecommendList() {
      dispatch({ type: "recommendIndex/fetchRecommendList" });
    },
    changeEnterLoading() {
      dispatch({ type: "recommendIndex/changeEnterLoading" });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
