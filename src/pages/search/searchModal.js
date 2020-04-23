import Taro from "@tarojs/taro";
import { getHotSearchList } from "../../services/searchService";

export default {
  namespace: "search",
  state: {
    hotSearchList: []
  },
  effects: {
    *getHotSearchList({ payload: {} }, { call, put }) {
      const { data } = yield call(getHotSearchList, {});

      yield put({ type: "saveHotSearchList", payload: { data } });
    }
  },
  reducers: {
    saveHotSearchList(state, { payload: { data } }) {
      return { ...state, hotSearchList: data };
    }
  }
};
