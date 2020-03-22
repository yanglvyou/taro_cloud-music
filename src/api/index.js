var baseUrl = "http://47.98.159.95/m-api";

export default {
  BannerUrl: baseUrl + "/banner", //首页Banner,
  RecommendListUrl: baseUrl + "/personalized", //推荐歌单,
  getHotSingerList: baseUrl + "/top/artists", //歌手列表
  getArtistList: baseUrl + "/artist/list",
  getRankList: baseUrl + "/toplist/detail", //排行榜数据
  getDetailList: baseUrl +"/playlist/detail", //排行榜数据
  getSingersDetailList: baseUrl +"/artists" //排行榜数据
};
