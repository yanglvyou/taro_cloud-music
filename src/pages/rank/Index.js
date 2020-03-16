import Taro, { Component } from "@tarojs/taro";
import {
  View,
  ScrollView,
  Swiper,
  SwiperItem,
  Image
} from "@tarojs/components";
import { connect } from "@tarojs/redux";
import CustomNavigation from "../../components/customNavigation/Index";
import RankTypeNav from "../../components/rankTypeNav/Index";
import { getWindowHeight } from "../../utils/util";
import emitter from "../../utils/event";

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
  handleChange(e) {
    const { current } = e.detail;
    if (current === 1) {
      this.setState({ currentIndex: current, currentType: "global" });
    } else {
      this.setState({ currentIndex: current, currentType: "official" });
    }
  }

  render() {
    const height = getWindowHeight(true);
    const globalList = this.props.globalList;
    console.log("globalList: ", globalList);
    const officialList = this.props.officialList;
    console.log("officialList: ", officialList);
    return (
      <View className="rank">
        <CustomNavigation background="#d44439" searchBar></CustomNavigation>
        <ScrollView srcollY style={{ height }}>
          <View className="rank__nav">
            <RankTypeNav
              currentType={this.state.currentType}
              typeItems={this.state.typeItems}
            />
          </View>
          <Swiper
            className="rank__wrap"
            style={{ height }}
            onChange={this.handleChange}
            current={this.state.currentIndex}
          >
            {this.state.typeItems.map(item => {
              return (
                <SwiperItem key={item.type}>
                  {this.state.currentType === "official" && (
                    <View>
                      <View className="rank__title">官方榜</View>
                      {this.props.officialList.map(offical => (
                        <View
                          key={offical.commentThreadId}
                          className="rank__official"
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
                        {this.props.globalList.map(global => (
                          <View className="rank__globalWrap-item">
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
                </SwiperItem>
              );
            })}
          </Swiper>
        </ScrollView>
      </View>
    );
  }
}

Rank.defaultProps = {};

// function mapStateToProps(state) {
//   const { list } = state.rankIndex;
//   return { list };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     onGetRankList() {
//       dispatch({ type: "rankIndex/fetchRankList" });
//     }
//   };
// }

export default Rank;
