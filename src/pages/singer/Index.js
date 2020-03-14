import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, ScrollView, Image, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import CustomNavigation from "../../components/customNavigation/Index";
import HorizenItem from "../../components/horizen-item/Index";
import { categoryTypes, alphaTypes } from "../../api/data";
import Loading from "../../components/Loading/Index";
import { getWindowHeight } from "../../utils/util";

import "./Index.less";

const Singers = props => {
  const height = getWindowHeight(true);
  const [count, setCount] = useState(0);
  const { singersList, more, enterLoading, onGetHotSingersList } = props;
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");
  const handleUpdateAlpha = val => {
    setAlpha(val);
  };
  const handleUpdateCategory = val => {
    console.log("val: ", val);
    setCategory(val);
  };
  const loadMoreSingers = () => {
    if (more) {
      onGetHotSingersList(count + 1);
      setCount(count + 1);
    }
  };

  useEffect(() => {
    onGetHotSingersList(0);
  }, []);
  console.log(singersList, 111133333);
  return (
    <View className="user">
      <CustomNavigation background="#d44439" searchBar></CustomNavigation>
      <View className="user__horizenItem">
        <HorizenItem
          list={categoryTypes}
          title="分类(默认热门)"
          oldVal={category}
          handleClick={val => handleUpdateCategory(val)}
        ></HorizenItem>
        <HorizenItem
          list={alphaTypes}
          title="首字母"
          oldVal={alpha}
          handleClick={val => handleUpdateAlpha(val)}
        ></HorizenItem>
      </View>

      <ScrollView
        scrollY
        style={{ height }}
        onScrollToLower={() => {
          loadMoreSingers();
        }}
        className="user__wrap"
      >
        {singersList.map((singer, index) => (
          <View key={index} className="user__list">
            <Image
              lazyLoad
              src={singer.picUrl}
              className="user__list-img"
            ></Image>
            <View className="user__list-name">{singer.name}</View>
          </View>
        ))}
      </ScrollView>
      {enterLoading && <Loading></Loading>}
    </View>
  );
};

function mapStateToProps(state) {
  const { singersList, enterLoading, more } = state.singerIndex;
  return { singersList, enterLoading, more };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetHotSingersList(count) {
      dispatch({ type: "singerIndex/fetchHotSingersList", payload: count });
    }
  };
}
Singers.defaultProps = {
  singersList: []
};

export default connect(mapStateToProps, mapDispatchToProps)(Singers);
