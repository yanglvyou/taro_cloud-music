import { getRankList } from "../../services/rankService";


export default {
  namespace:"detailIndex",
  state:{
    album:[],
  },

  effects:{
   *fetchDetailList({payload:id},{call,put}){
    const { playlist } = yield call(getRankList,id);
   }
  },

  reducers:{

  }
}
