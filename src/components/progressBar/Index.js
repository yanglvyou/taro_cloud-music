import Taro from "@tarojs/taro";
import { View, Slider } from "@tarojs/components";
import "./Index.less";

const ProgressBar = ({ percent, duration, currentTime }) => {
  return (
    <View className="progressBar">
      <View className="progressBar__currentTime">{currentTime}</View>
      <Slider
        value={percent}
        blockSize={15}
        className="progressBar__Slider"
        activeColor="#d43c33"
        onChange={e => this.props.onChange(e)}
        onChanging={e => this.props.onChanging(e)}
      />
      <View className="progressBar__duration">{duration}</View>
    </View>
  );
};

export default ProgressBar;
