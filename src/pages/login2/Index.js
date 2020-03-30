import Taro, { useState } from "@tarojs/taro";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { AtTabBar, AtIcon, AtSearchBar } from "taro-ui";
import { getWindowHeight } from "../../utils/util";
import "./Index.less";

const UserCenter = props => {
  const height = getWindowHeight(true);
  return (
    <View className="center">
      <ScrollView scrollY style={{ height }}>
        <View className="bruce">
          <View className="bubble-distribution">
            <View className="title">登录</View>
            <View className="account">
              <Input
                type="text"
                className="inputTxt"
                placeholderClass="placeholder"
                placeholder="请输入手机号"
                pattern="^1[3456789]\d{9}$|^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$"
                required
              />
              {/*<Image
                src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png"
                className="norImg"
              />*/}
              <Image
                src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png"
                className="img"
              />
            </View>
            <View className="password">
              <Input
                type="password"
                placeholderClass="placeholder"
                className="inputPass"
                placeholder="请输入密码"
                pattern="^[\dA-Za-z_]{6,20}$"
                required
              />
              <Image
                className="img"
                src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png"
              />
            </View>
          </View>

          <Button type="button" className="button">登录</Button>
        </View>
      </ScrollView>
    </View>
  );
};

UserCenter.config = {
  navigationBarTitleText: "我的"
};

export default UserCenter;
