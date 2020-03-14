import Taro, { useEffect, useRef } from "@tarojs/taro";
import { ScrollView, View, Text } from "@tarojs/components";
import classNames from "classnames";
import "./Index.less";

const HorizenItem = props => {
  const { list, title, oldVal, handleClick } = props;
  // const Category = useRef(null);
  return (
    <View className="horizen">
      <View className="horizen__horizenWrap">
        <Text className="horizen__title">{title}:</Text>
        {list.map(item => (
          <View
            className={classNames(
              "horizen__item",
              item.key === oldVal && "horizen__item-selected"
            )}
            onClick={() => handleClick(item.key)}
          >
            {item.name}
          </View>
        ))}
      </View>

    </View>
  );
};

HorizenItem.defaultProps = {
  list: [],
  title: "",
  oldVal: "",
  handleClick: () => {}
};

export default HorizenItem;
