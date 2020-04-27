import Taro, { useState, useEffect, useDidShow } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { AtSearchBar, AtIcon } from "taro-ui";
import { View, ScrollView } from "@tarojs/components";
import classnames from "classnames";
import { navigateTo } from "../../utils/navigate";
import {
  getWindowHeight,
  setKeyWordsHistory,
  clearKeywordsHistory,
  getKeyWordsHistory
} from "../../utils/util";
import "./Index.less";

function Index(props) {
  const { GetHotSearchList, hotSearchList,loadStatus } = props;
  const [searchValue, setSearchValue] = useState("");
  const [historyList, setHistoryList] = useState([]);
  console.log("historyList: ", historyList);

  function searchOnChange(val) {
    if (val) {
      setSearchValue(val);
      return;
    }
    Taro.showToast({ title: "输入为空", icon: "none" });
  }
  function clearSearchValue() {
    setSearchValue("");
  }

  function goToResult() {
    const keywords = searchValue;
    setKeyWordsHistory(keywords);
    navigateTo({ pathname: "/pages/searchResult/Index", search: { keywords } });
    setSearchValue("");
  }
  console.log("hotSearchList: ", hotSearchList);

  useEffect(() => {
    GetHotSearchList();
  }, []);

  useDidShow(() => {
    console.log("getKeyWordsHistory()", getKeyWordsHistory());
    setHistoryList(getKeyWordsHistory());
  });

  const height = getWindowHeight(true);
  if(loadStatus){
    Taro.setNavigationBarTitle({title:"搜索"})
  }
  return (
    <View className="searchIndex">
      <AtSearchBar
        actionName="搜索"
        focus
        fixed
        value={searchValue}
        onChange={val => {
          searchOnChange(val);
        }}
        onClear={() => {
          clearSearchValue();
        }}
        onActionClick={() => {
          goToResult();
        }}
        onConfirm={() => {
          goToResult();
        }}
      />
      <ScrollView
        scrollY
        scrollWithAnimation
        style={{ height }}
        className="scrollWrapper"
      >
        {historyList.length ? (
          <View className="search__history">
            <View className="search__history__title">
              <Text className="search__history__title__label">历史记录</Text>
              <AtIcon
                prefixClass="fa"
                value="trash-o"
                size="20"
                color="#cccccc"
                className="search__history__title__icon"
                onClick={() => {
                  setHistoryList([]);
                  clearKeywordsHistory();
                }}
              ></AtIcon>
            </View>
            <ScrollView className="search__history__list" scrollX>
              {historyList.map(keyword => (
                <Text
                  className="search__history__list__item"
                  key={keyword}
                  onClick={() => {
                    navigateTo({
                      pathname: "/pages/searchResult/Index",
                      search: { keyword }
                    });
                  }}
                >
                  {keyword}
                </Text>
              ))}
            </ScrollView>
          </View>
        ) : (
          ""
        )}
        <View className="search__hot">
          <View className="search__history__title">
            <Text className="search__history__title__label">热搜榜</Text>
          </View>
          <View className="search__hot__list">
            {hotSearchList.map((item, index) => (
              <View
                className="search__hot__list__item flex flex-align-center"
                key={item.searchWord}
                onClick={() => {
                  navigateTo({
                    pathname: "/pages/searchResult/Index",
                    search: { keyword:item.searchWord }
                  });
                }}
              >
                <View
                  className={classnames({
                    search__hot__list__item__index: true,
                    spec: index <= 2
                  })}
                >
                  {index + 1}
                </View>
                <View className="search__hot__list__item__info">
                  <View className="search__hot__list__item__info__top">
                    <View>
                      <Text
                        className={classnames({
                          search__hot__list__item__info__title: true,
                          spec: index <= 2
                        })}
                      >
                        {item.searchWord}
                      </Text>
                      {item.iconUrl ? (
                        <Image
                          src={item.iconUrl}
                          mode="widthFix"
                          className={classnames({
                            search__hot__list__item__info__icon: true,
                            spec: item.iconType === 5
                          })}
                        />
                      ) : (
                        ""
                      )}
                    </View>
                    <View>
                      <Text className="search__hot__list__item__info__score">
                        {item.score}
                      </Text>
                    </View>
                  </View>
                  <View className="search__hot__list__item__info__desc">
                    {item.content}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

Index.config={
  navigationBarTitleText:"加载中..."
}

const mapStateToProps = state => {
  const { hotSearchList,loadStatus } = state.search;
  return { hotSearchList ,loadStatus};
};

const mapDispatchToProps = dispatch => {
  return {
    GetHotSearchList() {
      dispatch({ type: "search/getHotSearchList", payload: {} });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
