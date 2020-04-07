import Taro, { PureComponent } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import {connect} from "@tarojs/redux";
import request from "../../api/config";
import api from "../../api/index";
import { parse_lrc } from "../../utils/util";
@connect(
  ({ song }) => ({
    playListDetailInfo: song.playListDetailInfo,
    recentTab: song.recentTab,
    isPlaying:song.isPlaying
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
          songInfo.url = res[0].url;
          request
            .get(api.getLyric, { id })
            .then(res => {
              const lrc = parse_lrc(
                res.lrc && res.lrc.lyric ? res.lrc.lyric : ""
              );
              res.lrclist = lrc.now_lrc;
              res.scroll = lrc.scroll ? 1 : 0;
              songInfo.lrcInfo = res;
              dispatch({
                type: "song/getSongInfo",
                payload: { currentSongInfo: songInfo }
              });
            })
            .catch(err => {
              console.log("获取歌词失败", err);
              dispatch({
                type: "song/getSongInfo",
                payload: { currentSongInfo: songInfo }
              });
            })
            .catch(err => {
              console.log("获取歌曲url失败", err);
              dispatch({
                type: "song/getSongInfo",
                payload: { currentSongInfo: songInfo }
              });
            });
        });
      });
  }

  render() {
    return <View>11111111</View>;
  }
}

export default Index;
