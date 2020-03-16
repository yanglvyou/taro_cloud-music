import Taro, { Component } from "@tarojs/taro";
import { View} from "@tarojs/components";
import classNames from "classnames";
import emitter from "../../utils/event";
import "./Index.less";

class RankTpyeNav extends Component {
  constructor(props) {
    super(props);
  }

  changeType(type) {
    emitter.emit("rankType", type);
  }
  render() {
    return (
      <View className="rankType">
          {this.props.typeItems.map(item => (
            <View
              onClick={this.changeType.bind(this, item.type)}
              className={classNames("rankType__item", {
                "rankType__item-active": this.props.currentType === item.type
              })}
              key={item.name}
            >
              {item.name}
            </View>
          ))}
      </View>
    );
  }
}

RankTpyeNav.defaultProps = {
  typeItems: []
};

export default RankTpyeNav;
