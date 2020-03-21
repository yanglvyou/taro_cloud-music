import Taro from "@tarojs/taro";

import { getBannerList } from "../services/homeService";
export default {
  namespace: "taroGlobal",
  state: {
    currentPage:{
      name:'',
      pathname:"",
      search:{},
      extra:""
    }
  },
  effects: {
    // *fetchBannerList({ payload }, { call, put }) {
    //   const bannerList = yield call(getBannerList);
    //   console.log("bannerList: ", bannerList);
    // }
  },
  reducers: {
    updateCurrentPage(state,{payload}){
      const currentPage={...state.currentPage,...payload};
      return {...state,currentPage}
    }
  }
};
