import request from "../api/config";
import api from "../api/index";

export async function likeMusic(id,like) {
  return request.get(api.likeMusic, { id,like});
}
export async function getLikeMusicList(id) {
  console.log('id: ', id,22222222);
  return request.get(api.getLikeMusicList,{uid:id});
}
