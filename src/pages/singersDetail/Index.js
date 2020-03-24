import Taro, {
  useEffect,
  useRouter,
  usePageScroll,
  useRef,
  useState,
  useDidHide
} from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { ScrollView, View, Image } from "@tarojs/components";
import CustomNavigation from "../../components/customNavigation/Index";
import { getWindowHeight, getName } from "../../utils/util";
// import { navigateTo } from "../../utils/navigate";
import Skeleton from "../../components/skeleton/Index";
import "./Index.less";

const SingerDetail = props => {
  const { onGetSingersDetailList, artist, hotSongs, updateCurrentPage } = props;
  // const [scrollTop, setScrollTop] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const id = router.params.id;
    updateCurrentPage();
    onGetSingersDetailList(id);
  }, []);
  usePageScroll(res => {
    const percent = res.scrollTop / 169;
    setOpacity(Math.min(1, percent));
    // setScrollTop(res.scrollTop);
  });
  useDidHide(() => {
    console.log("componentDidHide");
  });
  const height=getWindowHeight(true)
  return (
    <View className="detail">
      <CustomNavigation
        // ref={headerEl}
        // name={playlist.name}
        background="#d44439"
        back
        searchBar
      ></CustomNavigation>
      <Skeleton num={10} loading={hotSongs.length > 0 ? false : true}>
        {
          <View
            className="detail__marquee_container"
            style={{ opacity: `${opacity}` }}
          >
            <View className="detail__marquee_container-marquee_text">
              {artist.name}
            </View>
          </View>
        }

        <ScrollView scrollY scrollWithAnimation className="detail__wrap">
          <View className="detail__topDesc">
            <Image
              src={artist.picUrl}
              className="detail__topDesc-backgroundImg"
            ></Image>
            <View className="detail__shoucangWrap">
              <View className="detail__menu-shoucang">
                <Text className="iconfont icon-tianjia"></Text>
                <Text className="detail__menu-shoucang-txt">收藏</Text>
              </View>
            </View>

            <View className="detail__firstLine">
              <View className="detail__firstLine-playall">
                <Text className="iconfont icon-bofang"></Text>
                <Text className="detail__firstLine-all">播放全部</Text>
                <Text className="detail__firstLine-name">
                  (共{hotSongs.length}首)
                </Text>
              </View>
              <View className="detail__firstLine-add">
                <Text className="iconfont icon-tianjia"></Text>
                <Text className="collect">收藏 1.1万</Text>
              </View>
            </View>
            <View className="detail__songsListWrap">
              {hotSongs.map((item, index) => (
                <View className="detail__songsList">
                  <View className="detail__songsIndex">{index + 1}</View>
                  <View className="detail__songsListInfo">
                    <View className="detail__songsListInfo-name">
                      {item.name}
                    </View>
                    <View className="detail__songsListInfo-txt">
                      {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
                      {item.al ? item.al.name : item.album.name}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </Skeleton>
    </View>
  );
};

SingerDetail.config = {
  navigationStyle: "custom"
};

SingerDetail.defaultProps = {
  artist: [],
  hotSongs: [],
  onGetSingersDetailList: () => {}
};

function mapStateToProps(state) {
  const { artist, hotSongs } = state.singersDetailIndex;
  return { artist, hotSongs };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetSingersDetailList(id) {
      dispatch({
        type: "singersDetailIndex/fetchSingersDetailList",
        payload: id
      });
    },
    updateCurrentPage() {
      dispatch({
        type: "taroGlobal/updateCurrentPage",
        payload: { name: "singersDetailIndex" }
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingerDetail);
