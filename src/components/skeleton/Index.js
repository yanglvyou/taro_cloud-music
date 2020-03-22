import Taro, { useState, useEffect } from "@tarojs/taro";
import { View } from "@tarojs/components";
import classNames from "classnames";
import "./Index.less";

function Skeleton(props) {
  // const [contentArr,setContentArr]=useState([]);
  const contentArr = new Array(15).fill("");
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
          {contentArr.map((item, index) => (
            <View
              className={classNames(
                "skeleton__wrapper-content",
                index === 0 && "skeleton__wrapper-item1",
                index === 1 && "skeleton__wrapper-item2"
              )}
            ></View>
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
