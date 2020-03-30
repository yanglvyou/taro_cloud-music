import Taro, { useState } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { AtIcon, AtButton, AtToast } from "taro-ui";
import request from "../../api/config";
import api from "../../api/index";
import "./Index.less";

const Login = () => {
  console.log( 99999999);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [tip, setTip] = useState("");
  const login = () => {
    if (!phone) {
      setTip("请输入手机号");
      setShowTip(true);
      return;
    }
    if (!password) {
      setTip("请输入密码");
      setShowTip(true);
      return;
    }
    setShowLoading(true);
    request.get(api.userLogin, { phone, password }).then(res => {
      const { code } = res;
      let tip = "登录成功";
      if (code !== 200) {
        tip = res.msg || "登录失败";
      }
      setShowLoading(false);
      setShowTip(true);
      setTip(tip);
      if (code === 200) {
        Taro.setStorageSync("userInfo", res);
        Taro.setStorageSync("userId", res.account.id);
        Taro.navigateTo({
          url: "/pages/usercenter/Index"
        });
      }
    });
  };

  const handleChange = (type, event) => {
    const { value } = event.detail;
    if (type === "phone") {
      setPhone(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <View className="login_container">
      <View className="login_content">
        <View className="login_content__item">
          <AtIcon value="iphone" size="24" color="#ccc"></AtIcon>
          <Input
            type="text"
            placeholder="手机号"
            className="login_content__input"
            onInput={e => {
              handleChange("phone", e);
            }}
          />
        </View>
        <View className="login_content__item">
          <AtIcon value="lock" size="24" color="#ccc"></AtIcon>
          <Input
            type="text"
            password
            placeholder="密码"
            className="login_content__input"
            onInput={e => {
              handleChange("password", e);
            }}
          />
        </View>
        <AtButton className="login_content__btn" onClick={login.bind(this)}>
          登录
        </AtButton>
      </View>
      <AtToast
        isOpened={showLoading}
        text="登录中"
        status="loading"
        hasMask
        duration={30000000}
      ></AtToast>
      <AtToast isOpened={showTip} text={tip} hasMask duration={2000}></AtToast>
    </View>
  );
};

Login.config = {
  navigationBarTitleText: "登录"
};

export default Login;
