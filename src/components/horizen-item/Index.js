import Taro, { useEffect, useRef } from "@tarojs/taro";
import { ScrollView, View, Text } from "@tarojs/components";
import "./Index.less";

const HorizenItem = props => {
  const { list, title, oldVal } = props;
  const Category = useRef(null);
  // useEffect(() => {
  //   let categoryDom = Category.current;
  //   console.log(Category,'categoryDom: ', categoryDom);
  //   let tagElems = categoryDom.selectorQuery("span");
  //   let totalWidth = 0;
  //   Array.from(tagElems).forEach(ele => {
  //     totalWidth += ele.offsetWidth;
  //   });
  //   categoryDom.style.width = `${totalWidth}px`;
  // }, []);
  return (
    <ScrollView scrollX className="horizen">
      <View ref ={ Category } className="horizen__horizenWrap">
        <Text className="horizen__title">{title}:</Text>
        {list.map((item, index) => (
          <Text className="horizen__item">{item.name}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

HorizenItem.defaultProps = {
  list: [],
  title: "",
  oldVal: "",
  handleClick: () => {}
};

export default HorizenItem;
