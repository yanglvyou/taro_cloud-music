import { getSingersDetailList } from "../../services/singersDetailService";

export default {
  namespace: "singersDetailIndex",
  state: {
    artist: [],
    hotSongs:[]
  },

  effects: {
    *fetchSingersDetailList({ payload: id }, { call, put }) {
      const { artist,hotSongs } = yield call(getSingersDetailList, id);
      yield put({ type: "saveArtist", payload: artist });
      yield put({ type: "saveHotSongs", payload: hotSongs });
    }
  },

  reducers: {
    saveArtist(state, { payload: artist }) {
      {
        return { ...state, artist };
      }
    },
    saveHotSongs(state, { payload: hotSongs }) {
      {
        return { ...state, hotSongs };
      }
    },
    resetSingersDetailList(state, { payload }) {
      return { ...state, hotSongs: [] ,artist:[]};
    }
  }
};
