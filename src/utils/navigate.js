import Taro  from "@tarojs/taro";

import queryString from "query-string";

/**
 * 导航到某个页面
 * @param pathname
 * @param search 路径参数对象
 */

 export function navigateTo({pathname,search}){
   const searchStr =queryString.stringify(search);
   Taro.navigateTo({
     url:pathname + (searchStr ? '?'+ searchStr:"")
   })
 }

 export function navigateBack({delta}){
   Taro.navigateBack({delta});
 }
