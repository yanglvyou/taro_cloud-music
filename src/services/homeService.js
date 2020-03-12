import request from "../api/config";
import api from "../api/index";


export async function getBannerList() {
  return request.get(api.BannerUrl);
}
export async function getRecommendList() {
  return request.get(api.RecommendListUrl);
}


export async function getGoodsRelated(id) {
  return request.get(Api.GoodsRelated, {id});
}
