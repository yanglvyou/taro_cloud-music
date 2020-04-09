import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Image } from "@tarojs/components";
// import "./Index.less";

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      scrollInto: 'content-0'
    }
  }
  componentDidMount() {}
  btnClickOne () {
    this.setState({
      scrollInto: 'content-0'
    })
  }
  btnClickTwo () {
    this.setState({
      scrollInto: 'content-1'
    })
  }
  btnClickThree () {
    this.setState({
      scrollInto: 'content-2'
    })
  }
  render() {
    return (
      <View className="test-scroll">
        <Button className="btn" onClick={this.btnClickOne.bind(this)}>
          1
        </Button>
        <Button className="btn" onClick={this.btnClickTwo.bind(this)}>
          2
        </Button>
        <Button className="btn" onClick={this.btnClickThree.bind(this)}>
          3
        </Button>
        <ScrollView
          scrollY
          scrollIntoView={scrollInto}
          style={{ height: "300px" }}
        >
          <View
            style={{ background: "green", height: "300px" }}
            className="content"
            id="content-0"
          ></View>
          <View
            style={{ background: "yellow", height: "300px" }}
            className="content"
            id="content-1"
          ></View>
          <View
            style={{ background: "red", height: "300px" }}
            className="content"
            id="content-2"
          ></View>
        </ScrollView>
      </View>
    );
  }
}
