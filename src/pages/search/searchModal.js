import Taro from "@tarojs/taro";
import { getHotSearchList } from "../../services/searchService";

export default {
  namespace: "search",
  state: {
    hotSearchList: [],
    loadStatus:false
  },
  effects: {
    *getHotSearchList({ payload: {} }, { call, put }) {
      const { data } = yield call(getHotSearchList, {});
      yield put({ type: "saveHotSearchList", payload: { data } });
      yield put({type:"saveLoadStatus",payload:{loadStatus:true}})
    }
  },
  reducers: {
    saveHotSearchList(state, { payload: { data } }) {
      return { ...state, hotSearchList: data };
    },
    saveLoadStatus(state,{payload:{loadStatus}}){
      return {...state,loadStatus}
    }
  }
};
