import { getRankList } from "../../services/rankService";

export default {
  namespace: "detailIndex",
  state: {
    playlist: []
  },

  effects: {
    *fetchDetailList({ payload: id }, { call, put }) {
      console.log("id: ", id);
      const { playlist } = yield call(getRankList, { id });
      yield put({ type: "savePlayList", payload: playlist});
    }
  },

  reducers: {
    savePlayList(state, { payload: playlist }) {
      {
        return { ...state, playlist };
      }
    }
  }
};
