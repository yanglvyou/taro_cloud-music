import request from "../api/config";
import api from "../api/index";

export async function likeMusic(id,like) {
  return request.get(api.likeMusic, { id,like});
}
export async function getLikeMusicList(id) {
  return request.get(api.getLikeMusicList, { uid:id});
}
