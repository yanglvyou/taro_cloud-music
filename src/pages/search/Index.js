import Taro, { useState } from "@tarojs/taro";
import { AtSearchBar } from "taro-ui";
import { View, ScrollView } from "@tarojs/components";
import { getWindowHeight } from "../../utils/util";
import './Index.less';

function Index(props) {
  const height = getWindowHeight(true);
  return (
    <View className="searchIndex">
      <ScrollView scrollY scrollWithAnimation style={{ height }}>
        <AtSearchBar
          actionName="搜索"
          focus
          fixed
          // value={this.state.value}
          // onChange={this.onChange.bind(this)}
          // onActionClick={this.onActionClick.bind(this)}
        />
      </ScrollView>
    </View>
  );
}

export default Index;
