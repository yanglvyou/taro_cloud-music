import request from "../api/config";
import api from "../api/index";

export async function getRankList() {
  return request.get(api.getRankList);
}
