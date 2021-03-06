import Taro, { useState, useDidShow } from "@tarojs/taro";
import { AtSearchBar, AtModal } from "taro-ui";
import { getWindowHeight, formatCount } from "../../utils/util";
import { View, ScrollView } from "@tarojs/components";
import request from "../../api/config";
import api from "../../api/index";
import "./Index.less";

const Index = () => {
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [userCreateList, setUserCreateList] = useState([]);
  const [userCollectList, setUserCollectList] = useState([]);
  const height = getWindowHeight(true);
  const [userInfo, setUserInfo] = useState(Taro.getStorageSync("userInfo"));

  // const [searchValue, setSearchValue] = useState("");
  console.log("userInfo: ", userInfo);
  useDidShow(() => {
    setUserInfo(Taro.getStorageSync("userInfo"));
  });
  useDidShow(() => {
    const { userId } = userInfo.profile;
    request.get(api.getUserPlayList, { uid: userId, limit: 300 }).then(res => {
      if (res.playlist && res.playlist.length > 0) {
        setUserCreateList(res.playlist.filter(item => item.userId === userId));
        setUserCollectList(res.playlist.filter(item => item.userId !== userId));
      }
    });
  });

  function goToSearch() {
    console.log(90000);
    Taro.navigateTo({ url: "/pages/search/Index" });
  }

  function logOut() {
    setIsLogoutModal(true);
  }

  function handleCancel() {
    setIsLogoutModal(false);
  }

  function handleConfirm() {
    Taro.clearStorage();
    request.get(api.userLogOut).then(res => {
      console.log("退出登录", res);
    });
    Taro.navigateTo({ url: "/pagesSubPackage/pages/login/Index" });
    setIsLogoutModal(false);
  }

  function JumpPage(name) {
    Taro.navigateTo({ url: `/pagesSubPackage/pages/${name}/Index` });
  }

  return (
    <View className="usercenter">
      <ScrollView scrollY style={{ height }}>
        <View onClick={()=>{goToSearch();}}>
          <AtSearchBar
            actionName="搜索"
            disabled={true}
          ></AtSearchBar>
        </View>

        {userInfo && (
          <View>
            <View className="usercenter__header">
              <View className="usercenter__header__left">
                <Image
                  src={userInfo.profile.avatarUrl}
                  className="usercenter__header__left-userImg"
                ></Image>
                <View className="usercenter__header__left-userInfo">
                  <View className="usercenter__header__left-userName">
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
            <View className="usercenter__count">
              <View className="usercenter__count__dynamic">
                <View className="usercenter__count__dynamic-num">
                  {userInfo.profile.eventCount || 0}
                </View>
                <View className="usercenter__count__dynamic-txt">动态</View>
              </View>

              <View className="usercenter__count__attention">
                <View className="usercenter__count__attention-num">
                  {userInfo.profile.newFollows || 0}
                </View>
                <View className="usercenter__count__attention-txt">关注</View>
              </View>

              <View className="usercenter__count__fans">
                <View className="usercenter__count__fans-num">
                  {userInfo.profile.followeds || 0}
                </View>
                <View className="usercenter__count__fans-txt">粉丝</View>
              </View>
            </View>

            <View className="usercenter__user_brief">
              <View className="usercenter__user_brief__item">
                <Image
                  className="usercenter__user_brief__item-img"
                  src={require("../../assets/images/my/recent_play.png")}
                />
                <View
                  className="usercenter__user_brief__item-text"
                  onClick={() => {
                    JumpPage("recentPlay");
                  }}
                >
                  <Text>最近播放</Text>
                  <Text className="at-icon at-icon-chevron-right"></Text>
                </View>
              </View>
              <View className="usercenter__user_brief__item">
                <Image
                  className="usercenter__user_brief__item-img"
                  src={require("../../assets/images/my/my_radio.png")}
                />
                <View className="usercenter__user_brief__item-text">
                  <Text>我的电台</Text>
                  <Text className="at-icon at-icon-chevron-right"></Text>
                </View>
              </View>
              <View className="usercenter__user_brief__item">
                <Image
                  className="usercenter__user_brief__item-img"
                  src={require("../../assets/images/my/my_collection_icon.png")}
                />
                <View className="usercenter__user_brief__item-text">
                  <Text>我的收藏</Text>
                  <Text className="at-icon at-icon-chevron-right"></Text>
                </View>
              </View>
            </View>
            <View className="usercenter__playlist">
              <View className="usercenter__playlist-title">
                我创建的歌单
                <Text className="usercenter__playlist-desc">
                  ({userCreateList.length})
                </Text>
              </View>
              <View>
                {userCreateList.map(item => (
                  <View key={item.id} className="usercenter__playlist-item">
                    <Image
                      className="usercenter__playlist-img"
                      src={`${item.coverImgUrl}?imageView&thumbnail=250x0`}
                    />
                    <View className="usercenter__playlist-info">
                      <View className="usercenter__playlist-name">
                        {item.name}
                      </View>
                      <View className="usercenter__playlist-count">
                        {item.trackCount}首, 播放{formatCount(item.playCount)}次
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View className="usercenter__playlist">
              <View className="usercenter__playlist-title">
                我收藏的歌单
                <Text className="usercenter__playlist-desc">
                  ({userCollectList.length})
                </Text>
              </View>
              <View>
                {userCollectList.map(item => (
                  <View key={item.id} className="usercenter__playlist-item">
                    <Image
                      className="usercenter__playlist-img"
                      src={`${item.coverImgUrl}?imageView&thumbnail=250x0`}
                    />
                    <View className="usercenter__playlist-info">
                      <View className="usercenter__playlist-name">
                        {item.name}
                      </View>
                      <View className="usercenter__playlist-count">
                        {item.trackCount}首, 播放{formatCount(item.playCount)}次
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        {!userInfo && (
          <View className="usercenter__container">
            <View className="usercenter__container__noLogin">未登录</View>
            <View
              className="usercenter__container__goLogin"
              onClick={() => {
                Taro.navigateTo({ url: "/pagesSubPackage/pages/login/Index" });
              }}
            >
              去登录
            </View>
          </View>
        )}
      </ScrollView>
      <AtModal
        isOpened={isLogoutModal}
        title="确定退出登录?"
        cancelText="取消"
        confirmText="确认"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

Index.config = {
  navigationBarTitleText: "我的"
};

export default Index;
