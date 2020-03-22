import Taro, { useState, useEffect,useDidShow } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import CustomNavigation from "../../components/customNavigation/Index";
import HorizenItem from "../../components/horizen-item/Index";
import { categoryTypes, alphaTypes } from "../../api/data";
import Loading from "../../components/Loading/Index";
import { navigateTo } from "../../utils/navigate";
import { getWindowHeight } from "../../utils/util";

import "./Index.less";

const Singers = props => {
  const height = getWindowHeight(true);
  const [count, setCount] = useState(0);
  const {
    singersList,
    more,
    enterLoading,
    onGetHotSingersList,
    onGetSingersList,
    onClearSingerList
  } = props;
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");
  const handleUpdateAlpha = val => {
    onClearSingerList();
    const alpha = val.toLowerCase();
    onGetSingersList(category, alpha, 0);
    setCount(0);
    setAlpha(val);
  };
  const handleUpdateCategory = val => {
    onClearSingerList();
    onGetSingersList(val, alpha, 0);
    setCount(0);
    setCategory(val);
  };
  const loadMoreSingers = () => {
    if (more && alpha === "" && category === "") {
      onGetHotSingersList(count + 1);
      setCount(count + 1);
    } else if (more) {
      onGetSingersList(category, alpha, count + 1);
      setCount(count + 1);
    }
  };

  useEffect(() => {
    onGetHotSingersList(0);
  }, []);
  useDidShow(()=>{
    props.dispatch({type:"singersDetailIndex/resetSingersDetailList"})
  })
  const goToDetail = singer => {
    navigateTo({ pathname: "/pages/singersDetail/Index", search:{id:singer.id } });
    console.log("singer: ", singer.id);
  };
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
          <View
            key={singer.accountId}
            className="user__list"
            onClick={() => goToDetail(singer)}
          >
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
    },
    onGetSingersList(category, alpha, count) {
      dispatch({
        type: "singerIndex/fetchSingersList",
        payload: category,
        alpha,
        count
      });
    },
    onClearSingerList() {
      dispatch({ type: "singerIndex/clearSingersList", payload: {} });
    }
  };
}
Singers.defaultProps = {
  singersList: []
};

Singers.config = {
  navigationStyle: "custom"
};

export default connect(mapStateToProps, mapDispatchToProps)(Singers);
