import Taro, { FC } from "@tarojs/taro";
import classnames from "classnames";
import { View } from "@tarojs/components";

import "./Index.less";

const CLyric = ({ lrc, lrcIndex, showLyric, onTrigger }) => {
  const cls = classnames({
    song__lyric_components: true,
    hidden: !showLyric
  });
  return (
    <View
      className={cls}
      style={{
        overflow:
          lrc.scroll && !lrc.nolyric && !lrc.uncollected ? "auto" : "hidden"
      }}
      onClick={() => onTrigger()}
    >
      <View
        className="song__lyric__wrap"
        style={{
          transform: `translateY(-${(lrcIndex * 100) / lrc.lrclist.length}%)`
        }}
      >
        {lrc.nolyric && !lrc.uncollected ? (
          <View className="song__lyric__notext">纯音乐，无歌词</View>
        ) : (
          ""
        )}
        {lrc.scroll && !lrc.nolyric && !lrc.uncollected ? (
          <View className="song__lyric__notext">*歌词不支持滚动*</View>
        ) : (
          ""
        )}
        {lrc.uncollected && !lrc.nolyric ? (
          <View className="song__lyric__notext">暂无歌词</View>
        ) : (
          ""
        )}
        {lrc.lrclist.map((item, index) => (
          <View
            key={item.lrc_sec}
            className={classnames({
              song__lyric__text: true,
              "song__lyric__text--current": index === lrcIndex && !lrc.scroll
            })}
            data-time={item.lrc_sec}
          >
            {item.lrc_text}
          </View>
        ))}
      </View>
    </View>
  );
};
CLyric.defaultProps = {
  lrc: {
    scroll: false,
    nolyric: false,
    uncollected: false,
    lrclist: []
  },
  lrcIndex: 0,
  showLyric: false
};
export default CLyric;
