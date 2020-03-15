import request from "../api/config";
import api from "../api/index";

export async function getHotSingerList(count) {
  return request.get(api.getHotSingerList, { offset: count });
}

export async function getArtistList(category,alpha,count) {
  const initial=alpha.toLowerCase();
  return request.get(api.getArtistList, { cat:category,initial,offset: count });
}


export async function getGoodsRelated(id) {
  return request.get(Api.GoodsRelated, {id});
}
