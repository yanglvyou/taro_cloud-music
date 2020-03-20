import request from "../api/config";
import api from "../api/index";

export async function getRankList(id) {
  return request.get(api.getRankList,id);
}

export async function getDetailList(id) {
  return request.get(api.getDetailList,id);
}
