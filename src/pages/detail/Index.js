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
        <View className="detail__topDesc">
          <Image
            src={playlist.coverImgUrl}
            className="detail__topDesc-backgroundImg"
          ></Image>
          <View className="detail__topDesc-info">
            <View className="detail__topDesc-imgWrap">
              <Image
                src={playlist.coverImgUrl}
                className="detail__topDesc-img"
              ></Image>
              <View className="detail__topDesc-decorate"></View>
            </View>
            <View className="detail__topDesc-descWrap">
              <View className="detail__topDesc-title">{playlist.name}</View>
              <View className="detail__topDesc-avatar">
                <Image
                  src={playlist.creator.avatarUrl}
                  className="detail__topDesc-avatarImg"
                ></Image>
                <View className="detail__topDesc-name">{playlist.creator.nickname}</View>
              </View>
            </View>
          </View>
          <View className="detail__menu">
            <View className="detail__menu-pinglun">
              <Text className="iconfont icon-pinglun"></Text>
              <Text className="txt">评论</Text>
            </View>
            <View className="detail__menu-shoucang">
              <Text className="iconfont icon-xihuan1"></Text>
              <Text className="txt">收藏</Text>
            </View>

            <View className="detail__menu-dianzan">
              <Text className="iconfont icon-tianjia"></Text>
              <Text className="txt">点赞</Text>
            </View>
            <View className="detail__menu-more">
              <Text className="iconfont icon-youcecaidan"></Text>
              <Text className="txt">更多</Text>
            </View>
          </View>
          <View className="detail__firstLine">
            <View className="detail__firstLine-playall">
              <Text className="iconfont icon-bofang"></Text>
              <Text className="detail__firstLine-all">播放全部</Text>
              <Text className="detail__firstLine-name">
                (共{playlist.tracks.length}首)
              </Text>
            </View>
            <View className="detail__firstLine-add">
              <Text className="iconfont icon-tianjia"></Text>
              <Text className="collect">收藏 1.1万</Text>
            </View>
          </View>
          <View className="detail__songsList">
            {playlist.tracks.map((item, index) => (
              <View>
                <Text>{index + 1}</Text>
                <View>
                  <Text>{item.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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
