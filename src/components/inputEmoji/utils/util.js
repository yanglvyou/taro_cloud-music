import weibo from "./weibo_emotions";
const emotions = weibo.emotions;
const weibo_icon_url = weibo.weibo_icon_url;
export const weibo_emojis = (function () {
  const _emojis = {}
  for (const key in emotions) {
      if (emotions.hasOwnProperty(key)) {
          const ele = emotions[key];
          for (const item of ele) {
              _emojis[item.value] = {
                  id: item.id,
                  value: item.value,
                  icon: item.icon.replace('/', '_'),
                  url: weibo_icon_url + item.icon
              }
          }
      }
  }
  return _emojis
})();
