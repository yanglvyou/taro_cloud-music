import Taro, { PureComponent } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import classnames from "classnames";
import request from "../../api/config";
import api from "../../api/index";
import { parse_lrc } from "../../utils/util";
import './Index.less';
@connect(
  ({ song }) => ({
    song: song
  }),
  dispatch => ({})
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
      playPercent: 0
    };
  }

  componentDidMount() {
    this.getSongInfo();
  }

  getSongInfo() {
    const { id } = this.$router.params;
    request
      .get(api.getSongDetail, {
        ids: id
      })
      .then(res => {
        let songInfo = res.songs[0];
        request.get(api.getSongUrl, { id }).then(res => {
          console.log("res: ", res);
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

  render() {
    const { currentSongInfo, playMode } = this.props.song
    const { isPlaying, showLyric, lrc, lrcIndex, star, playPercent } = this.state
    let playModeImg = require('../../assets/images/song/icn_loop_mode.png')
    if (playMode === 'one') {
      playModeImg = require('../../assets/images/song/icn_one_mode.png')
    } else if (playMode === 'shuffle') {
      playModeImg = require('../../assets/images/song/icn_shuffle_mode.png')
    }
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
            <View className="song__music__main__cover">
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
            // onClick={this.showLyric.bind(this)}
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
        {/*<CSlider
          percent={playPercent}
          onChange={this.percentChange.bind(this)}
          onChanging={this.percentChanging.bind(this)}
        />*/}
        {/*<CLyric
          lrc={lrc}
          lrcIndex={lrcIndex}
          showLyric={showLyric}
          onTrigger={() => this.hiddenLyric()}
        />*/}
        <View className="song__bottom">
          <View className="song__operation">
            <Image
              src={playModeImg}
              className="song__operation__mode"
              // onClick={this.changePlayMode.bind(this)}
            />
            <Image
              src={require("../../assets/images/ajh.png")}
              className="song__operation__prev"
              // onClick={this.getPrevSong.bind(this)}
            />
            {isPlaying ? (
              <Image
                src={require("../../assets/images/ajd.png")}
                className="song__operation__play"
                // onClick={this.pauseMusic.bind(this)}
              />
            ) : (
              <Image
                src={require("../../assets/images/ajf.png")}
                className="song__operation__play"
                // onClick={this.playMusic.bind(this)}
              />
            )}
            <Image
              src={require("../../assets/images/ajb.png")}
              className="song__operation__next"
              // onClick={this.getNextSong.bind(this)}
            />
            <Image
              src={
                star
                  ? require("../../assets/images/song/play_icn_loved.png")
                  : require("../../assets/images/song/play_icn_love.png")
              }
              className="song__operation__like"
              // onClick={this.likeMusic.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
