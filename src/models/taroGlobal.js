import Taro from "@tarojs/taro";

import { getBannerList } from "../services/homeService";
export default {
  namespace: "taroGlobal",
  state: {
    bannerList: [],
    arr: []
  },
  effects: {
    *fetchBannerList({ payload }, { call, put }) {
      const bannerList = yield call(getBannerList);
      console.log("bannerList: ", bannerList);
    }
  },
  reducers: {}
};
