import Taro, { useEffect } from "@tarojs/taro";
import { View, Button, ScrollView, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import CustomNavigation from "../../components/customNavigation/Index";
import Banner from "../../components/banner/Index";
import { getWindowHeight } from "../../utils/util";

import "./Index.less";

function Index(props) {
  const { bannerList, onGetBanner } = props;
  useEffect(() => {
    onGetBanner();
  }, []);

  const height = getWindowHeight(true);
  console.log(bannerList, 44444444);
  return (
    <View className="recommendIndex">
      <CustomNavigation background="#d44439" searchBar></CustomNavigation>
      <ScrollView scrollY style={{ height }}>
        <View className="bannerWrap">
          <Banner bannerList={bannerList}></Banner>
        </View>
        首页 <Text className="iconfont icon-shanchu"></Text>
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  const { bannerList } = state.recommendIndex;
  return { bannerList };
}
function mapDispatchToProps(dispatch) {
  return {
    onGetBanner() {
      dispatch({ type: "recommendIndex/fetchBannerList" });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
