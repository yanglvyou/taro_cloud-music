import Taro, { useEffect } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./Index.less";

const Banner = (props) => {
  return (
    <View className="banner">
      <Swiper
        className="banner__swiper"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {props.bannerList.map(item => {
          return (
            <SwiperItem
              onClick={() => {
                Taro.showToast({ title: "没有开发", icon: "none" });
              }}
            >
              <Image
                src={item.imageUrl}
                className="banner__img"
                width="100%"
                height="100%"
                mode="aspectFill"
              ></Image>
            </SwiperItem>
          );
        })}
      </Swiper>
    </View>
  );
};
Banner.defaultProps = {
  bannerList: []
};
export default Banner;
