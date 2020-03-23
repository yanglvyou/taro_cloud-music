import Taro, { useState } from "@tarojs/taro";
import TestCanvas from "../../components/canvas/Index";

import "./Index.less";
import { View } from "@tarojs/components";

const Canvas = props => {
  return (
    <View>
      <TestCanvas></TestCanvas>
    </View>
  );
};

export default Canvas;
