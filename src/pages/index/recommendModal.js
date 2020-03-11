import Taro from "@tarojs/taro";

import { getBannerList } from "../../services/homeService";
export default {
  namespace: "recommendIndex",
  state: {
    bannerList: []
  },
  effects: {
    *fetchBannerList({ payload }, { call, put }) {
      const { banners: bannerList } = yield call(getBannerList);
      console.log("bannerList: 8888888", bannerList);
      yield put({ type: "saveBannerList", payload: { bannerList } });
    }
  },
  reducers: {
    saveBannerList(state, { payload: { bannerList } }) {
      return { ...state, bannerList };
    }
  }
};
