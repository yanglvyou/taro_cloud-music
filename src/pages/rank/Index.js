// import Taro, { useState } from "@tarojs/taro";
// import { ScrollView, View, Button, Text } from "@tarojs/components";
// import { connect } from "@tarojs/redux";
// import CustomNavigation from "../../components/customNavigation/Index";
// import RankTypeNav from "../../components/rankTypeNav/Index";
// import { getWindowHeight } from "../../utils/util";
// import emitter from "../../utils/event";

// import "./Index.less";

// const Rank = props => {
//   const typeItems = [
//     { type: "official", name: "官方榜" },
//     { type: "global", name: "全球榜" }
//   ];
//   const height = getWindowHeight(true);
//   return (
//     <View className="rank">
//       <CustomNavigation background="#d44439" searchBar></CustomNavigation>
//       <RankTypeNav typeItems={typeItems} />
//       首页 <Text className="iconfont icon-shanchu"></Text>
//     </View>
//   );
// };

// Rank.defaultProps = {};

// export default Rank;

import Taro, { useState, Component } from "@tarojs/taro";
import { View, Text, ScrollView, Swiper, SwiperItem } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import CustomNavigation from "../../components/customNavigation/Index";
import RankTypeNav from "../../components/rankTypeNav/Index";
import { getWindowHeight } from "../../utils/util";
import emitter from "../../utils/event";

import "./Index.less";
@connect(
  ({ rankIndex }) => ({ list: rankIndex.list }),
  dispatch => ({
    onGetRankList() {
      dispatch({ type: "rankIndex/fetchRankList" });
    }
  })
)
class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeItems: [
        { type: "official", name: "官方榜" },
        { type: "global", name: "全球榜" }
      ],
      currentType: "official"
    };
  }

  componentDidMount() {
    this.props.onGetRankList();
    this.eventEmitter = emitter.addListener("rankType", async type => {
      console.log("type: ", type);
      this.setState({currentType:type})
    });
  }

  render() {
    const height = getWindowHeight(true);
    return (
      <View className="rank">
        <CustomNavigation background="#d44439" searchBar></CustomNavigation>
        <RankTypeNav
          currentType={this.state.currentType}
          typeItems={this.state.typeItems}
        />
        首页 <Text className="iconfont icon-shanchu"></Text>
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
