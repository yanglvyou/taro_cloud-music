import Taro, { useState, FC } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtIcon, AtFloatLayout } from "taro-ui";
import classnames from "classnames";
import "./Index.less";

const backgroundAudioManager = Taro.getBackgroundAudioManager();

const CMusic = props => {
  let { currentSongInfo, isPlaying, canPlayList } = props.songInfo;
  const { updatePlayStatus } = props;
  const [isOpened, setIsOpened] = useState(false);
  currentSongInfo = currentSongInfo || {};
  //没有歌曲正在播放
  if (!currentSongInfo.name) return <View></View>;

  function goDetail() {
    const { id } = currentSongInfo;
    Taro.navigateTo({
      url: `/pages/songDetail/Index?id=${id}`
    });
  }

  function switchPlayStatus() {
    const { isPlaying } = props.songInfo;
    if (isPlaying) {
      backgroundAudioManager.pause();
      updatePlayStatus(false);
    } else {
      backgroundAudioManager.play();
      updatePlayStatus(true);
    }
  }

  function playSong(id) {
    Taro.navigateTo({
      url: `/pages/songDetail/Index?id=${id}`
    });
  }

  return (
    <View
      className={classnames({
        music_components: true
        // isHome: isHome
      })}
    >
      <Image
        className={classnames({
          music__pic: true,
          "z-pause": !isPlaying,
          circling: true
        })}
        src={currentSongInfo.al.picUrl}
      />
      <View className="music__info" onClick={() => goDetail()}>
        <View className="music__info__name">{currentSongInfo.name}</View>
        <View className="music__info__desc">
          {currentSongInfo.ar[0] ? currentSongInfo.ar[0].name : ""} -{" "}
          {currentSongInfo.al.name}
        </View>
      </View>
      <View className="music__icon--play">
        <AtIcon
          value={isPlaying ? "pause" : "play"}
          size="30"
          color="#d44439"
          onClick={() => switchPlayStatus()}
        ></AtIcon>
      </View>
      <View className="liebiao" onClick={() => setIsOpened(true)}>
        <Text className="iconfont icon-liebiao"></Text>
      </View>
      <AtFloatLayout
        isOpened={isOpened}
        title="播放列表"
        scrollY
        onClose={() => setIsOpened(false)}
      >
        <View className="music__playlist">
          {canPlayList.map(item => (
            <View
              key={item.id}
              className={classnames({
                music__playlist__item: true,
                current: item.current
              })}
            >
              <View
                className="music__playlist__item__info"
                onClick={() => playSong(item.id)}
              >
                {`${item.name} - ${item.ar[0] ? item.ar[0].name : ""}`}
              </View>
              <View className="music__playlist__item__close">
                <AtIcon value="chevron-right" size="16" color="#ccc" />
              </View>
            </View>
          ))}
        </View>
      </AtFloatLayout>
    </View>
  );
};

CMusic.defaultProps = {
  songInfo: {
    currentSongInfo: {
      id: 0,
      name: "",
      ar: [],
      al: {
        picUrl: "",
        name: ""
      },
      url: "",
      lrcInfo: "",
      dt: 0, // 总时长，ms
      st: 0 // 是否喜欢
    },
    canPlayList: [],
    isPlaying: false
  }
};

CMusic.options = {
  addGlobalClass: true
};

const mapDispatchToProps = dispatch => {
  return {
    updatePlayStatus(isPlaying) {
      dispatch({
        type: "song/updatePlayStatus",
        payload: { isPlaying }
      });
    }
  };
};
const mapStateToProps = state => {
  const { playListDetailInfo } = state.song;
  return playListDetailInfo;
};

export default connect(mapStateToProps, mapDispatchToProps)(CMusic);
