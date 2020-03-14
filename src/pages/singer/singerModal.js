import { getHotSingerList } from "../../services/singersService";
export default {
  namespace: "singerIndex",
  state: {
    enterLoading: true,
    singersList: [],
    more:true,
  },
  effects: {
    *fetchHotSingersList({ payload: count }, { call, put }) {
      const { artists: singersList ,more} = yield call(getHotSingerList, count);
      yield put({ type: "saveSingersList", payload: { singersList ,more} });
      yield put({ type: "saveEnterLoading", payload: { enterLoading: false } });
    }
  },
  reducers: {
    saveSingersList(state, { payload: { singersList,more } }) {
      return { ...state, more,singersList:[...state.singersList,...singersList] };
    },
    saveEnterLoading(state, { payload: { enterLoading } }) {
      return { ...state, enterLoading };
    }
  }
};
