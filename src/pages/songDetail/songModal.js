import Taro from "@tarojs/taro";
export default {
  namespace: "song",
  state: {
    playListDetailInfo: {
      coverImgUrl: "",
      name: "",
      playCount: 0,
      tags: [],
      creator: {
        avatarUrl: "",
        nickname: ""
      },
      tracks: []
    },
    canPlayList: [],
    playListDetailPrivileges: [],
    recommendPlayList: [],
    recommendDj: [],
    recommendNewSong: [],
    recommend: [],
    myCreateList: [],
    myCollectList: [],
    currentSongId: "",
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
    currentSongIndex: 0,
    playMode: "loop",
    likeMusicList: [],
    isPlaying: false,
    recentTab: 0
  },
  effects: {
    // *getSongInfo({ payload }, { call, put }) {
    //   const bannerList = yield call(getBannerList);
    //   console.log("bannerList: ", bannerList);
    // }
  },
  reducers: {
    updateCanPlayList(state, { payload: { canPlayList, currentSongId } }) {
      const currentSongIndex = canPlayList.findIndex(
        item => item.id === currentSongId
      );
      return {
        ...state,
        canPlayList: canPlayList,
        currentSongIndex
      };
    },
    updateRecentTab(state, { payload: { recentTab } }) {
      console.log("recentTab: ", recentTab);
      return {
        ...state,
        recentTab
      };
    },
    saveSongInfo(state, { payload: { currentSongInfo } }) {
      let currentSongIndex = state.canPlayList.findIndex(
        item => item.id === currentSongInfo.id
      );
      let canPlayList=state.canPlayList.map((item, index) => {
        item.current = false;
        if (currentSongIndex === index) {
          item.current = true;
        }
        return item;
      });
      return {
        ...state,
        currentSongInfo,
        currentSongIndex,
        canPlayList
      };
    },
    changePlayMode(state,{payload:{playMode}}){
      return {...state,playMode}
    }
  }
};
