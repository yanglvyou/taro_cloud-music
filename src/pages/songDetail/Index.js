import Taro, { PureComponent } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import classnames from "classnames";
import request from "../../api/config";
import api from "../../api/index";
import ProgressBar from "../../components/progressBar/Index";
import CLyric from "../../components/CLyric/Index";
import { parse_lrc, formatPlayTime } from "../../utils/util";
import "./Index.less";
const backgroundAudioManager = Taro.getBackgroundAudioManager();
@connect(
  ({ song }) => ({
    song: song,
    canPlayList: song.canPlayList
  }),
  dispatch => ({
    onChangePlayMode(playMode) {
      dispatch({ type: "song/changePlayMode", payload: { playMode } });
    }
  })
)
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: Taro.getStorageSync("userInfo"),
      // isPlaying: this.props.isPlaying,
      lyric: "",
      showLyric: false,
      lrc: {
        scroll: false,
        nolyric: false,
        uncollected: false,
        lrclist: []
      },
      lrcIndex: 0,
      star: false,
      firstEnter: true,
      switchStar: false,
      playPercent: 0,
      currentTime: "0:00" //歌曲播放时间
    };
  }

  componentDidMount() {
    const that = this;
    const { id } = this.$router.params;
    this.getSongInfo(id);
    backgroundAudioManager.onTimeUpdate(() => {
      Taro.getBackgroundAudioPlayerState({
        success(res) {
          if (res.status !== 2) {
            that.updateLrc(res.currentPosition);
            that.updateProgress(res.currentPosition);
          }
        }
      });
    });
    backgroundAudioManager.onPause(() => {
      that.setState({
        isPlaying: false
      });
    });
    backgroundAudioManager.onPlay(() => {
      that.setState({
        isPlaying: true
      });
    });
    backgroundAudioManager.onEnded(() => {
      const { playMode } = this.props.song;
      const routes = Taro.getCurrentPages();
      const currentRoute = routes[routes.length - 1].route;
      // 如果在当前页面则直接调用下一首的逻辑，反之则触发nextSong事件
      if (currentRoute === "pages/songDetail/Index") {
        this.playByMode(playMode);
      } else {
        // Taro.eventCenter.trigger('nextSong')
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
    this.setStar(
      nextProps.song.likeMusicList,
      nextProps.song.currentSongInfo.id
    );
    if (
      this.props.song.currentSongInfo.name !==
        nextProps.song.currentSongInfo.name ||
      this.state.firstEnter
    ) {
      this.setState({
        firstEnter: false
      });
      this.setSongInfo(nextProps.song.currentSongInfo);
    }
  }

  updateLrc(currentPosition) {
    const { lrc } = this.state;
    let lrcIndex = 0;
    if (lrc && !lrc.scroll && lrc.lrclist && lrc.lrclist.length > 0) {
      lrc.lrclist.forEach((item, index) => {
        if (item.lrc_sec <= currentPosition) {
          lrcIndex = index;
        }
      });
    }
    this.setState({
      lrcIndex
    });
  }

  componentWillMount() {
    // this.getLikeList();
  }

  getLikeList() {
    try {
      const { id } = this.state.userInfo.account;
      this.props.dispatch({type:"song/getLikeMusicList",payload:{id}})
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    //更新播放状态
    this.props.dispatch({
      type: "song/updatePlayStatus",
      payload: { isPlaying: this.state.isPlaying }
    });
  }

  // 根据播放模式进行播放
  playByMode(playMode) {
    switch (playMode) {
      case "one":
        this.getCurrentSong();
        break;
      case "shuffle":
        this.getShuffleSong();
        break;
      // 默认按列表顺序播放
      default:
        this.getNextSong();
    }
  }

  setSongInfo(songInfo) {
    try {
      const { name, al, url, lrcInfo } = songInfo;
      Taro.setNavigationBarTitle({
        title: name
      });
      backgroundAudioManager.title = name;
      backgroundAudioManager.coverImgUrl = al.picUrl;
      backgroundAudioManager.src = url;
      this.setState({
        lrc: lrcInfo,
        isPlaying: true,
        firstEnter: false
      });
    } catch (err) {
      console.log("err", err);
      this.getNextSong();
    }
  }
  //获取歌曲信息
  getSongInfo(id) {
    request
      .get(api.getSongDetail, {
        ids: id
      })
      .then(res => {
        let songInfo = res.songs[0];
        request.get(api.getSongUrl, { id }).then(res => {
          songInfo.url = res.data[0].url;
          request
            .get(api.getLyric, { id })
            .then(res => {
              const lrc = parse_lrc(
                res.lrc && res.lrc.lyric ? res.lrc.lyric : ""
              );
              res.lrclist = lrc.now_lrc;
              res.scroll = lrc.scroll ? 1 : 0;
              songInfo.lrcInfo = res;
              this.props.dispatch({
                type: "song/saveSongInfo",
                payload: { currentSongInfo: songInfo }
              });
            })
            .catch(err => {
              console.log("获取歌词失败", err);
              this.props.dispatch({
                type: "song/saveSongInfo",
                payload: { currentSongInfo: songInfo }
              });
            })
            .catch(err => {
              console.log("获取歌曲url失败", err);
              this.props.dispatch({
                type: "song/saveSongInfo",
                payload: { currentSongInfo: songInfo }
              });
            });
        });
      });
  }
  //播放歌曲
  playMusic() {
    backgroundAudioManager.play();
    this.setState({
      isPlaying: true
    });
  }
  // 循环播放当前歌曲
  getCurrentSong() {
    const { currentSongInfo } = this.props.song;
    this.setSongInfo(currentSongInfo);
  }
  //暂停歌曲
  pauseMusic() {
    backgroundAudioManager.pause();
    this.setState({
      isPlaying: false
    });
  }

  // 获取下一首
  getNextSong() {
    const { currentSongIndex, canPlayList, playMode } = this.props.song;
    let nextSongIndex = currentSongIndex + 1;
    if (playMode === "shuffle") {
      this.getShuffleSong();
      return;
    }
    if (currentSongIndex === canPlayList.length - 1) {
      nextSongIndex = 0;
    }
    const id = canPlayList[nextSongIndex].id;
    this.getSongInfo(id);
  }

  // 获取上一首
  getPrevSong() {
    const { currentSongIndex, canPlayList, playMode } = this.props.song;
    let prevSongIndex = currentSongIndex - 1;
    if (playMode === "shuffle") {
      this.getShuffleSong();
      return;
    }
    if (currentSongIndex === 0) {
      prevSongIndex = canPlayList.length - 1;
    }
    const id = canPlayList[prevSongIndex].id;
    this.getSongInfo(id);
  }

  // 随机播放歌曲
  getShuffleSong() {
    const { canPlayList } = this.props.song;
    let nextSongIndex = Math.floor(Math.random() * (canPlayList.length - 1));
    const id = canPlayList[nextSongIndex].id;
    this.props.getSongInfo(id);
  }
  //切换播放模式
  changePlayMode() {
    let { playMode } = this.props.song;
    if (playMode === "loop") {
      playMode = "one";
      Taro.showToast({
        title: "单曲循环",
        icon: "none",
        duration: 2000
      });
    } else if (playMode === "one") {
      playMode = "shuffle";
      Taro.showToast({
        title: "随机播放",
        icon: "none",
        duration: 2000
      });
    } else {
      playMode = "loop";
      Taro.showToast({
        title: "列表循环",
        icon: "none",
        duration: 2000
      });
    }
    this.props.onChangePlayMode(playMode);
  }

  percentChange(e) {
    const { value } = e.detail;
    const { dt } = this.props.song.currentSongInfo;
    let currentPosition = Math.floor(((dt / 1000) * value) / 100);
    backgroundAudioManager.seek(currentPosition);
    backgroundAudioManager.play();
  }

  percentChanging() {
    backgroundAudioManager.pause();
  }

  updateProgress(currentPosition) {
    const currentTime = formatPlayTime(currentPosition);
    const { dt } = this.props.song.currentSongInfo;
    this.setState({
      currentTime,
      playPercent: Math.floor((currentPosition * 1000 * 100) / dt)
    });
  }

  hiddenLyric() {
    this.setState({
      showLyric: false
    });
  }

  showLyric() {
    this.setState({
      showLyric: true
    });
  }
  //喜欢音乐
  likeMusic() {
    const { star } = this.state;
    const { id } = this.props.song.currentSongInfo;
    console.log(99999999);
    this.props.dispatch({
      type: "song/likeMusic",
      payload: { like:!star,id }
    });
    this.setState({
      switchStar: true
    });
  }

  setStar(likeList, id) {
    const { switchStar } = this.state;
    const flag = likeList.indexOf(id) !== -1;
    console.log("flag: ", flag, 44444444);
    this.setState({
      star: flag
    });
    if (switchStar) {
      this.setState({
        switchStar: false
      });
      Taro.showToast({
        title: flag ? "已添加到我喜欢的音乐" : "已取消喜欢",
        icon: "none",
        duration: 2000
      });
    }
  }

  render() {
    const { currentSongInfo, playMode } = this.props.song;
    const { dt } = this.props.song.currentSongInfo;
    const duration = formatPlayTime(`${dt / 1000}`); //获取歌曲总时间
    const {
      isPlaying,
      showLyric,
      lrc,
      lrcIndex,
      star,
      playPercent,
      currentTime
    } = this.state;
    let playModeImg = require("../../assets/images/song/icn_loop_mode.png");
    if (playMode === "one") {
      playModeImg = require("../../assets/images/song/icn_one_mode.png");
    } else if (playMode === "shuffle") {
      playModeImg = require("../../assets/images/song/icn_shuffle_mode.png");
    }

    const playingLyric = lrc.lrclist.filter((item, index) => {
      return index === lrcIndex && !lrc.scroll;
    });

    return (
      <View className="song_container">
        <Image className="song__bg" src={currentSongInfo.al.picUrl} />
        <View
          className={classnames({
            song__music: true,
            hidden: showLyric
          })}
        >
          <View
            className={classnames({
              song__music__main: true,
              playing: isPlaying
            })}
          >
            <Image
              className="song__music__main--before"
              src={require("../../assets/images/aag.png")}
            />
            <View
              className={classnames(
                "song__music__main__cover",
                !isPlaying && "transform__pause"
              )}
            >
              <View
                className={classnames({
                  song__music__main__img: true,
                  "z-pause": !isPlaying,
                  circling: true
                })}
              >
                <Image
                  className="song__music__main__img__cover"
                  src={currentSongInfo.al.picUrl}
                />
              </View>
            </View>
          </View>
          <View
            className="song__music__lgour"
            onClick={this.showLyric.bind(this)}
          >
            <View
              className={classnames({
                song__music__lgour__cover: true,
                "z-pause": !isPlaying,
                circling: true
              })}
            ></View>
          </View>
        </View>
        {!showLyric && (
          <View className="playingLyric">{playingLyric[0].lrc_text || ""}</View>
        )}
        <ProgressBar
          percent={playPercent}
          currentTime={currentTime}
          duration={duration}
          onChange={this.percentChange.bind(this)}
          onChanging={this.percentChanging.bind(this)}
        />
        <CLyric
          lrc={lrc}
          lrcIndex={lrcIndex}
          showLyric={showLyric}
          onTrigger={() => this.hiddenLyric()}
        />
        <View className="song__bottom">
          <View className="song__operation">
            <Image
              src={playModeImg}
              className="song__operation__mode"
              onClick={this.changePlayMode.bind(this)}
            />
            <Image
              src={require("../../assets/images/ajh.png")}
              className="song__operation__prev"
              onClick={this.getPrevSong.bind(this)}
            />
            {isPlaying ? (
              <Image
                src={require("../../assets/images/ajd.png")}
                className="song__operation__play"
                onClick={this.pauseMusic.bind(this)}
              />
            ) : (
              <Image
                src={require("../../assets/images/ajf.png")}
                className="song__operation__play"
                onClick={this.playMusic.bind(this)}
              />
            )}
            <Image
              src={require("../../assets/images/ajb.png")}
              className="song__operation__next"
              onClick={this.getNextSong.bind(this)}
            />
            <Image
              src={
                star
                  ? require("../../assets/images/song/play_icn_loved.png")
                  : require("../../assets/images/song/play_icn_love.png")
              }
              className="song__operation__like"
              onClick={this.likeMusic.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
