import request from "../api/config";
import api from "../api/index";

export async function getHotSearchList() {
  return request.get(api.getHotSearchList);
}

export async function getDetailList(id) {
  return request.get(api.getDetailList,id);
}
