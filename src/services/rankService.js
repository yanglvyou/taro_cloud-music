import request from "../api/config";
import api from "../api/index";

export async function getRankList(id) {
  return request.get(api.getRankList,id);
}
