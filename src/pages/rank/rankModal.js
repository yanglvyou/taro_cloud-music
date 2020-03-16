import { getRankList } from "../../services/rankService";
import { filterIndex } from "../../utils/util";

export default {
  namespace: "rankIndex",
  state: {
    globalList:[],
    officialList:[]
  },
  effects: {
    *fetchRankList({ payload }, { call, put }) {
      const { list } = yield call(getRankList);
      console.log('list: ', list);
      const globalStartIndex = filterIndex(list);
      console.log('globalStartIndex: ', globalStartIndex);
      const officialList =list.slice(0, globalStartIndex);
      const globalList =list.slice(globalStartIndex);

      yield put({ type: "saveOfficialList", payload: { officialList } });
      yield put({type:"saveGlobalList",payload:{globalList}})
    }
  },
  reducers: {
    saveOfficialList(state,{payload:{officialList}}){
      return {...state,officialList}
    },
    saveGlobalList(state,{payload:{globalList}}){
      return {...state,globalList}
    }
  }
};
