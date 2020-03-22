import request from "../api/config";
import api from "../api/index";

export async function getSingersDetailList(id) {
  return request.get(api.getSingersDetailList, { id });
}
