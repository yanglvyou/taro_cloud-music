import { getRankList } from "../../services/rankService";


export default {
  namespace:"rankIndex",
  state:{
    list:[]
  },
  effects:{
    *fetchRankList({payload },{call,put}){
      const {list } = yield call(getRankList);
    }
  },
  reducers:{

  }
}
