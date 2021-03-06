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
// import CustomNavigation from "../../components/customNavigation/Index";
import { getWindowHeight, getName } from "../../utils/util";
import CMusic from "../../components/CMusic/Index";
import { navigateTo } from "../../utils/navigate";
import Skeleton from "../../components/skeleton/Index";
import "./Index.less";

const Detail = props => {
  const {
    onGetAlbumList,
    playlist,
    updateCurrentPage,
    updateCanplayList,
    song
  } = props;
  console.log("playlist: ", playlist);
  const [scrollTop, setScrollTop] = useState(0);
  var marqueeEl = useRef(null);
  const inputEl = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const id = router.params.id;
    updateCurrentPage();
    onGetAlbumList(id);
  }, []);
  usePageScroll(res => {
    const percent = res.scrollTop / 169;
    setOpacity(Math.min(1, percent));
  });
  useDidHide(() => {
    console.log("componentDidHide");
  });

  const saveData = songId => {
    const recordList = playlist.tracks;
    const tempList = recordList.map(item => {
      let temp = {};
      temp.name = item.name;
      temp.id = item.id;
      temp.ar = item.ar;
      temp.al = item.al;
      temp.copyright = item.copyright;
      temp.st = item.st;
      return temp;
    });
    const canPlayList = tempList.filter(item => {
      return item.st !== -200;
    });
    updateCanplayList({
      canPlayList,
      currentSongId: songId
    });
  };
  const playSong = (songId, canPlay) => {
    if (canPlay) {
      saveData(songId);
      navigateTo({
        pathname: "/pages/songDetail/Index",
        search: { id: songId }
      });
      return;
    }
    Taro.showToast({ title: "无法播放", icon: "none" });
  };
  const height = getWindowHeight(true);
  return (
    <View className="detail">
      <ScrollView scrollY scrollWithAnimation style={{height}}>
        <Skeleton
          num={10}
          loading={Object.keys(props.playlist).length > 0 ? false : true}
        >
          {
            <View
              ref={marqueeEl}
              className="detail__marquee_container"
              style={{ opacity: `${opacity}` }}
            >
              <View className="detail__marquee_container-marquee_text">
                {playlist.name}
              </View>
            </View>
          }

          <View scrollY scrollWithAnimation className="detail__wrap">
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
                    <View className="detail__topDesc-name">
                      {playlist.creator.nickname}
                    </View>
                  </View>
                </View>
              </View>
              <View className="detail__menu">
                <View className="detail__menu-pinglun">
                  <Text className="iconfont2 icon-pinglun"></Text>
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
              <View className="detail__songsListWrap">
                {playlist.tracks &&
                  playlist.tracks.map((item, index) => (
                    <View
                      className="detail__songsList"
                      onClick={() => {
                        playSong(item.id, item.st !== -200);
                      }}
                    >
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
          </View>
        </Skeleton>
      </ScrollView>
      <CMusic songInfo={song} />
    </View>
  );
};

Detail.config = {
  // navigationStyle: "custom"
};

Detail.defaultProps = {
  playlist: {
    tracks: []
  },
  onGetAlbumList: () => {}
};

function mapStateToProps(state) {
  const { playlist } = state.detailIndex;
  const song = state.song;
  return { playlist, song };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetAlbumList(id) {
      dispatch({ type: "detailIndex/fetchDetailList", payload: id });
    },
    updateCurrentPage() {
      dispatch({
        type: "taroGlobal/updateCurrentPage",
        payload: { name: "detailIndex" }
      });
    },
    updateCanplayList(payload) {
      dispatch({
        type: "song/updateCanPlayList",
        payload
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
