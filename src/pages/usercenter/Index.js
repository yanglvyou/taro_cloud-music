import Taro, { useState, useDidShow } from "@tarojs/taro";
import { AtSearchBar, AtIcon } from "taro-ui";
import { getWindowHeight } from "../../utils/util";
import { View, ScrollView } from "@tarojs/components";
import request from "../../api/config";
import api from "../../api/index";
import "./Index.less";

const Index = () => {
  const height = getWindowHeight(true);
  const [userInfo,setUserInfo ]= useState(Taro.getStorageSync("userInfo"));

  const [searchValue, setSearchValue] = useState("");
  console.log("userInfo: ", userInfo);
  useDidShow(() => {
    setUserInfo(Taro.getStorageSync("userInfo"));
    // if (!userInfo) {
    //   Taro.navigateTo({ url: "/pages/login/Index" });
    // }
  });

  const goToSearch = () => {
    Taro.navigateTo({ url: "/pages/search/Index" });
  };

  function logOut() {
    Taro.clearStorage();
    request.get(api.userLogOut).then(res => {
      console.log("退出登录", res);
    });
    Taro.navigateTo({ url: "/pages/login/Index" });
  }

  return (
    <View className="usercenter">
      <ScrollView scrollY style={{ height }}>
        <AtSearchBar
          actionName="搜索"
          disabled={true}
          value={searchValue}
          onChange={() => {
            goToSearch();
          }}
        ></AtSearchBar>
        {userInfo && (
          <View className="usercenter__header">
            <View className="usercenter__header__left">
              <Image
                src={userInfo.profile.avatarUrl}
                className="usercenter__header__left-userImg"
              ></Image>
              <View className="usercenter__header__left-userInfo">
                <View className="usercenter__header__left-userName">
                  {" "}
                  {userInfo.profile.nickname}
                </View>
                <View className="usercenter__header__left-userLv">
                  <Text>LV.6</Text>
                </View>
              </View>
            </View>
            <View
              className="usercenter__header__right"
              onClick={() => {
                logOut();
              }}
            >
              退出登录
            </View>
          </View>
        )}
        {!userInfo && (
          <View className="usercenter__container">
            <View className="usercenter__container__noLogin">未登录</View>
            <View
              className="usercenter__container__goLogin"
              onClick={() => {
                Taro.navigateTo({ url: "/pages/login/Index" });
              }}
            >
              去登录
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
