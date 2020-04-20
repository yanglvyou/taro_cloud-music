import Taro, { useState, FC } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtIcon, AtFloatLayout } from "taro-ui";
import classnames from "classnames";
// import { currentSongInfoType, MusicItemType } from "../../constants/commonType";
import "./Index.less";

const backgroundAudioManager = Taro.getBackgroundAudioManager();

const CMusic = ({ songInfo }) => {
  let { currentSongInfo, isPlaying, canPlayList } = songInfo;
  console.log("currentSongInfo: ", currentSongInfo, 33333);
  const [isOpened, setIsOpened] = useState(false);
  // currentSongInfo = currentSongInfo || {};
  currentSongInfo = {
    a: null,
    al: {
      id: 21521,
      name: "陈慧娴金曲精选26首",
      pic: 109951163637041870,
      pic_str: "109951163637041877",
      picUrl:
        "https://p1.music.126.net/hPoSYFGVAfYjV3JiSObglQ==/109951163637041877.jpg",
      tns: []
    },
    alia: [],
    ar: [
      {
        alias: [],
        id: 7225,
        name: "陈慧娴",
        tns: []
      }
    ],
    cd: "1",
    cf: "",
    copyright: 1,
    cp: 7003,
    crbt: null,
    djId: 0,
    dt: 230000,
    fee: 8,
    ftype: 0,
    h: {
      br: 320000,
      fid: 0,
      size: 9223420,
      vd: 5880
    },
    id: 212376,
    l: {
      br: 128000,
      fid: 0,
      size: 3689431,
      vd: 7845
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5534094,
      vd: 6919
    },
    mark: 8192,
    mst: 9,
    mv: 0,
    name: "傻女",
    no: 16,
    noCopyrightRcmd: null,
    originCoverType: 0,
    pop: 100,
    pst: 0,
    publishTime: 731001600000,
    rt: "600902000006280932",
    rtUrl: null,
    rtUrls: [],
    rtype: 0,
    rurl: null,
    s_id: 0,
    st: 0,
    t: 0,
    v: 57
  };
  //没有歌曲正在播放
  if (!currentSongInfo.name) return <View></View>;

  function goDetail() {
    const { id } = currentSongInfo;
    Taro.navigateTo({
      url: `/pages/songDetail/index?id=${id}`
    });
  }

  function switchPlayStatus() {
    const { isPlaying } = songInfo;
    if (isPlaying) {
      backgroundAudioManager.pause();
      this.props.dispatch({
        type: "song/updatePlayStatus",
        payload: { isPlaying: false }
      });
    } else {
      backgroundAudioManager.play();
      this.props.dispatch({
        type: "song/updatePlayStatus",
        payload: { isPlaying: false }
      });
    }
  }

  function playSong(id) {
    Taro.navigateTo({
      url: `/pages/songDetail/index?id=${id}`
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
          "z-pause": false,
          circling: isPlaying
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

CMusic.options={
  addGlobalClass:true
}

export default CMusic;
