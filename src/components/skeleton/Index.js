import Taro, { useState, useEffect } from "@tarojs/taro";
import { View } from "@tarojs/components";
import classNames from "classnames";
import "./Index.less";

function Skeleton(props) {
  // const [contentArr,setContentArr]=useState([]);
  const contentArr = new Array(10).fill("");
  console.log("props: ", props);
  // useEffect(() => {
  //  setContentArr(new Array(props.num).fill(""))

  // }, [props.num])

  if (!props.loading) {
    return <View>{props.children}</View>;
  }
  return (
    <View className="skeleton">
      <View className="skeleton__wrapper">
        <View className="skeleton__wrapper-image"></View>
        {/*<View className="skeleton__wrapper-avater">
          <View className="skeleton__wrapper-cir"></View>
          <View className="skeleton__wrapper-line">
            <View className="skeleton__wrapper-line1"></View>
            <View className="skeleton__wrapper-line2"></View>
          </View>
  </View>*/}
        <View className="skeleton__wrapper-contentWrap">
          {contentArr.map(() => (
            <View className="skeleton__wrapper-content"></View>
          ))}
        </View>
      </View>
    </View>
  );
}

Skeleton.defaultProps = {
  num: 10
};

export default Skeleton;
