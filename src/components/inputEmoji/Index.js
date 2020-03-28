import Taro, { Component } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import { weibo_emojis } from "./utils/util";
import "./Index.less";
import { getWindowHeight } from "../../utils/util";

export default class InputEmoji extends Component {
  static defaultProps={
    emojiHeight:0
  }
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  delEmoji(){
    this.props.delEmoji();
  }

  chooseEmoji(value){
    this.props.chooseEmoji(value);
  }

  render() {
    const height=this.props.emojiHeight+`px`;
    console.log('this.props.emojiHeight: ', this.props.emojiHeight);
    return (
      <View className="emoji">
        <ScrollView scrollY style={{height}} className="scroll">
          <View className="icons">
            {weibo_emojis.map(emoji => {
              return (
                <View className="imgWrap"  key={emoji.id} onClick={this.chooseEmoji.bind(this,emoji.value)}>
                  <Image className="icon-image" src={emoji.url}></Image>
                </View>
              );
            })}
            <View></View>
          </View>
        </ScrollView>
        <View className="btn-box">
           <View className="btn-del" onClick={this.delEmoji.bind(this)}>
             <Text className="iconfont2 icon-input-del"></Text>
           </View>
        </View>
      </View>
    );
  }
}
