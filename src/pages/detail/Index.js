import Taro, { useEffect,useRouter } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { ScrollView, View, Image } from "@tarojs/components";
import "./Index.less";

const Detail = props => {
  const { onGetAlbumList } = props;
  const router = useRouter()
  console.log('router: ', router);
  useEffect(() => {
    // onGetAlbumList();
  }, []);
  return <View>1111111111</View>;
};

Detail.defaultProps = {};

function mapStateToProps(state) {
  const albunList = state.album;
  return { albunList };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetAlbumList() {
      dispatch({ type: "detailIndex/fetchDetailList" });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
