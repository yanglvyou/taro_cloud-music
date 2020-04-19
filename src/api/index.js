var baseUrl = "http://47.98.159.95/m-api";

export default {
  BannerUrl: baseUrl + "/banner", //首页Banner,
  RecommendListUrl: baseUrl + "/personalized", //推荐歌单,
  getHotSingerList: baseUrl + "/top/artists", //歌手列表
  getArtistList: baseUrl + "/artist/list",
  getRankList: baseUrl + "/toplist/detail", //排行榜数据
  getDetailList: baseUrl +"/playlist/detail", //排行榜数据
  getSingersDetailList: baseUrl +"/artists", //排行榜数据
  userLogin: baseUrl +"/login/cellphone",//登录
  userLogOut: baseUrl +"/logout",//登录
  getUserPlayList:baseUrl+'/user/playlist',//我的创建的歌单
  getrecentPlayList:baseUrl+'/user/record',//我的创建的歌单
  getSongDetail:baseUrl+'/song/detail',
  getSongUrl:baseUrl+'/song/url',
  getLyric:baseUrl+'/lyric',
  likeMusic:baseUrl+'/like',
  getLikeMusicList:baseUrl+'/likelist',
};
