import request from "../api/config";
import api from "../api/index";


export async function userLogin(phone,password) {
  return request.get(api.userLogin,{phone,password});
}


