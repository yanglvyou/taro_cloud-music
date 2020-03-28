import Taro, { Component } from "@tarojs/taro";
import { View, Textarea, Button, Text, Image } from "@tarojs/components";
import classNames from "classnames";
// import { AtTextarea } from "taro-ui";
import InputEmoji from "../../components/inputEmoji/Index";
import { getWindowHeight, getName } from "../../utils/util";
import "./Index.less";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      bottom: 0,
      emoji: false
    };
    this.images = [];
    this.content = "";
    // this.bottom = 0;
  }
  componentDidMount() {}

  chooseEmoji(val) {
    let str = this.content.split("");
    str.splice(this.cursor, 0, val);
    this.content = str.join("");
    if (this.cursor === -1) {
      this.cursor += val.length + 1;
    } else {
      this.cursor += val.length;
    }
    // this.canSend();
  }

  delEmoji() {
    let str = this.content.split("");
    const leftStr = this.content.substring(0, this.cursor);
    const leftLen = leftStr.length;
    const rightStr = this.content.substring(this.cursor);
    const left_left_Index = leftStr.lastIndexOf("[");
    const left_right_Index = leftStr.lastIndexOf("]");
    const right_right_Index = rightStr.indexOf("]");
    const right_left_Index = rightStr.indexOf("[");
    if (
      left_right_Index === leftLen - 1 &&
      leftLen - left_left_Index <= 8 &&
      left_left_Index > -1
    ) {
      // "111[不简单]|23[33]"left_left_Index=3,left_right_Index=7,leftLen=8
      const len = left_right_Index - left_left_Index + 1;
      str.splice(this.cursor - len, len);
      this.cursor -= len;
    } else if (
      left_left_Index > -1 &&
      right_right_Index > -1 &&
      left_right_Index < left_left_Index &&
      right_right_Index <= 6
    ) {
      // left_left_Index:4,left_right_Index:3,right_right_Index:1,right_left_Index:2
      // "111[666][不简|单]"right_right_Index=1,left_left_Index=3,leftLen=6
      let len = right_right_Index + 1 + (leftLen - left_left_Index);
      if (len <= 10) {
        str.splice(this.cursor - (leftLen - left_left_Index), len);
        this.cursor -= leftLen - left_left_Index;
      } else {
        str.splice(this.cursor, 1);
        this.cursor -= 1;
      }
    } else {
      str.splice(this.cursor, 1);
      this.cursor -= 1;
    }
    this.content = str.join("");
  }
  async chooseImage() {
    const res = await Taro.chooseImage({
      count: 5,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"]
    });
    const { tempFilePaths } = res;
    for (const file of tempFilePaths) {
      const info = await Taro.getImageInfo({
        src: file
      });
      const { height, width, type } = info;
      this.images.push({
        height,
        width,
        type,
        path: file
      });
    }
  }

  onKeyboardHeightChange(e) {
    const { height } = e.detail;
    this.setState({ bottom: height });
  }
  onInput(event) {
    const { value } = event.detail;
    console.log("event: ", event);
    this.setState({ value });
  }
  goToEmoji() {
    Taro.hideKeyboard();
    const emoji=this.state.emoji;
    this.setState({ emoji: !emoji});
  }
  render() {
    console.log("this.bottom: ", this.state.bottom, this.state.value);
    const value = this.state.value;
    const emojiHeight=this.state.bottom;
    console.log("value: ", value);
    const height = getWindowHeight(true);
    return (
      <View className="container">
        <ScrollView scrollY style={{ height }}>
          <Textarea
            value={this.state.value}
            onInput={this.onInput.bind(this)}
            autoFocus
            maxLength={200}
            onKeyboardHeightChange={this.onKeyboardHeightChange.bind(this)}
            placeholder="写点什么吧..."
          />
          <View className="item-add" onClick={this.chooseImage.bind(this)}>
            <Text className="iconfont2 icon-add" />
          </View>
          <View className="tool" style={{ bottom: `${this.state.bottom}px` }}>
            <Text
              class="iconfont2 icon-tupian"
              onClick={this.chooseImage.bind(this)}
            ></Text>
            <View onClick={this.goToEmoji.bind(this)}>
              {!this.state.emoji ? (
                <Text className="iconfont2 icon-emoji"></Text>
              ) : (
                <Text className="iconfont2 icon-jianpan"></Text>
              )}
            </View>

            <View
              className={classNames("post", {
                "post-active": value !== ""
              })}
            >
              发布
            </View>
          </View>
          {this.state.emoji && (
            <InputEmoji
              delEmoji={this.delEmoji.bind(this)}
              chooseEmoji={this.chooseEmoji.bind(this)}
              emojiHeight={emojiHeight}
            ></InputEmoji>
          )}
        </ScrollView>
      </View>
    );
  }
}
