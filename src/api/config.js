import Taro from "@tarojs/taro";

function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    Taro.request({
      url: url,
      data: data,
      method: method,
      header: {
        "Content-Type": "application/json",
        "X-Litemall-Token": Taro.getStorageSync("token"),
        cookie:Taro.getStorageSync('cookies')
      },
      xhrFields: {
        withCredentials: true
      },
      success: function(res) {
        if (res.cookies && res.cookies.length > 0) {
          let cookies = "";
          res.cookies.forEach((cookie, index) => {
            // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
            if (cookie.name && cookie.value) {
              cookies +=
                index === res.cookies.length - 1
                  ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}`
                  : `${cookie.name}=${cookie.value};`;
            } else {
              cookies += `${cookie};`;
            }
          });
          Taro.setStorageSync("cookies", cookies);
          console.log("cookies: ", cookies);
        }
        if (res.header && res.header["Set-Cookie"]) {
          Taro.setStorageSync("cookies", res.header["Set-Cookie"]);
        }
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res.errMsg);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

request.get = (url, data) => {
  return request(url, data, "GET");
};

request.post = (url, data) => {
  return request(url, data, "POST");
};

export default request;
