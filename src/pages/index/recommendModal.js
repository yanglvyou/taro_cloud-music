import Taro from "@tarojs/taro";

import { getBannerList, getRecommendList } from "../../services/homeService";
export default {
  namespace: "recommendIndex",
  state: {
    bannerList: [],
    recommendList: [],
    enterLoading: true
  },
  effects: {
    *fetchBannerList({ payload }, { call, put }) {
      const { banners: bannerList } = yield call(getBannerList);
      console.log("bannerList: 8888888", bannerList);
      yield put({ type: "saveBannerList", payload: { bannerList } });
    },
    *fetchRecommendList({ payload }, { call, put }) {
      const { result: recommendList } = yield call(getRecommendList);
      yield put({ type: "saveRecommendList", payload: { recommendList } });
    },
    *changeEnterLoading({ payload }, { call, put }) {
      yield put({ type: "saveEnterLoading", payload: { enterLoading: false } });
    }
  },
  reducers: {
    saveBannerList(state, { payload: { bannerList } }) {
      return { ...state, bannerList };
    },
    saveRecommendList(state, { payload: { recommendList } }) {
      return { ...state, recommendList };
    },
    saveEnterLoading(state, { payload: {enterLoading} }) {
      return { ...state, enterLoading };
    }
  }
};
