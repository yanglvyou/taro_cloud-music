import Taro, { Component } from "@tarojs/taro";
import {
  View,
  ScrollView,
  Swiper,
  SwiperItem,
  Image
} from "@tarojs/components";
import { connect } from "@tarojs/redux";
// import CustomNavigation from "../../components/customNavigation/Index";
import RankTypeNav from "../../components/rankTypeNav/Index";
import { getWindowHeight } from "../../utils/util";
import CMusic from "../../components/CMusic/Index";
import emitter from "../../utils/event";
import { navigateTo } from "../../utils/navigate";

import "./Index.less";
@connect(
  ({ rankIndex }) => ({
    globalList: rankIndex.globalList,
    officialList: rankIndex.officialList
  }),
  dispatch => ({
    onGetRankList() {
      dispatch({ type: "rankIndex/fetchRankList" });
    }
  })
)
class Rank extends Component {
  static defaultProps = {
    globalList: [],
    officialList: []
  };
  constructor(props) {
    super(props);
    this.state = {
      typeItems: [
        { type: "official", name: "官方榜" },
        { type: "global", name: "全球榜" }
      ],
      currentType: "official",
      currentIndex: 0
    };
  }

  componentDidMount() {
    this.props.onGetRankList();
    this.eventEmitter = emitter.addListener("rankType", async type => {
      this.setState({ currentType: type });
    });
  }

  componentDidShow(){
      this.props.dispatch({type:"detailIndex/resetPlayList"})

  }

  componentWillUnmount() {
    this.eventEmitter.remove();
  }
  handleChange(e) {
    const { current } = e.detail;
    if (current === 1) {
      this.setState({ currentIndex: current, currentType: "global" });
    } else {
      this.setState({ currentIndex: current, currentType: "official" });
    }
  }

  goToDetail(item) {
    console.log("item: ", item);
    navigateTo({ pathname: "/pages/detail/Index", search: { id: item.id } });
  }

  render() {
    const height = getWindowHeight(true);
    const globalList = this.props.globalList;
    const officialList = this.props.officialList;
    return (
      <View className="rank">
        <ScrollView scrollY style={{height}} scrollWithAnimation>
          <View className="rank__nav">
            <RankTypeNav
              currentType={this.state.currentType}
              typeItems={this.state.typeItems}
            />
          </View>
          <Swiper
            className="rank__wrap"
            onChange={this.handleChange}
            current={this.state.currentIndex}
            style={{ height }}
          >
            {this.state.typeItems.map(item => {
              return (
                <SwiperItem key={item.type}>
                  <ScrollView scrollY style={{ height }}>
                    {this.state.currentType === "official" && (
                      <View>
                        <View className="rank__title">官方榜</View>
                        {officialList.map(offical => (
                          <View
                            key={offical.commentThreadId}
                            className="rank__official"
                            onClick={this.goToDetail.bind(this, offical)}
                          >
                            <View className="rank__imgWrap">
                              <Image
                                className="rank__imgWrap-img"
                                src={offical.coverImgUrl}
                              ></Image>
                              <View className="rank__imgWrap-txt">
                                {offical.updateFrequency}
                              </View>
                            </View>
                            <View className="rank__info">
                              {offical.tracks.map((item, index2) => {
                                return (
                                  <View key={index2}>
                                    {`${index2 + 1}. ${
                                      offical.tracks[index2].first
                                    } - ${offical.tracks[index2].second}`}
                                  </View>
                                );
                              })}
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                    {this.state.currentType === "global" && (
                      <View className="rank__global">
                        <View className="rank__global-title">全球榜</View>
                        <View className="rank__globalWrap">
                          {globalList.map(global => (
                            <View
                              className="rank__globalWrap-item"
                              onClick={this.goToDetail.bind(this, global)}
                            >
                              <Image
                                src={global.coverImgUrl}
                                className="rank__globalWrap-img"
                              ></Image>
                              <View className="rank__globalWrap-txt">
                                {global.updateFrequency}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                  </ScrollView>
                </SwiperItem>
              );
            })}
          </Swiper>
        </ScrollView>
        <CMusic songInfo={this.props.song} />
      </View>
    );
  }
}

Rank.defaultProps = {};

Rank.config={
  // navigationStyle:"custom"
}

function mapStateToProps(state) {
  const { list } = state.rankIndex;
  const song = state.song;
  return { list,song };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetRankList() {
      dispatch({ type: "rankIndex/fetchRankList" });
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Rank);
