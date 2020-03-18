import Taro, { useEffect, useRouter } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { ScrollView, View, Image } from "@tarojs/components";
import CustomNavigation from "../../components/customNavigation/Index";
import { getWindowHeight } from "../../utils/util";
import { navigateTo } from "../../utils/navigate";
import "./Index.less";

const Detail = props => {
  const { onGetAlbumList, playlist } = props;
  console.log("props: ", props);
  const router = useRouter();
  console.log("router: ", router);
  useEffect(() => {
    const id = router.params.id;
    onGetAlbumList(id);
  }, []);
  console.log(playlist, 22222222);
  return (
    <View className="detail">
      <CustomNavigation background="#d44439" back searchBar></CustomNavigation>
      <ScrollView scrollY className="detail__wrap">
        <View className="topDesc"></View>
      </ScrollView>
    </View>
  );
};

Detail.defaultProps = {};

function mapStateToProps(state) {
  const { playlist } = state.detailIndex;
  return { playlist };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetAlbumList(id) {
      dispatch({ type: "detailIndex/fetchDetailList", payload: id });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
