import Taro, { PureComponent} from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import { getWindowHeight } from "../../utils/util";
import request from "../../api/config";
import api from "../../api/index";
import "./Index.less";

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      tabList: [{ title: "最近七天" }, { title: "全部" }],
      recordList: [],
    };
  }
  componentDidMount(){
    this.getData();
  }

  getData() {
    const {currentTab}=this.state;
    const userId = Taro.getStorageSync("userId");
    const dataType = currentTab === 0 ? "weekData" : "allData";
    request
      .get(api.getrecentPlayList, {
        uid: userId,
        type: currentTab === 0 ? 1 : 0,
      })
      .then((res) => {
        if (res && res[dataType] && res[dataType].length > 0) {
          this.setState({recordList:res[dataType]})
        }
      });
  }

  switchTab(val) {
    console.log('val: ', val);
    this.setState({currentTab:val,recordList:[]},()=>{
      this.getData();
    })
  }

  render() {
    const height = getWindowHeight(true);
    const { recordList, currentTab, tabList } = this.state
    return (
      <View className="recentPlay">
        <ScrollView scrollY scrollWithAnimation>
          <AtTabs
            swipeable={false}
            current={currentTab}
            tabList={tabList}
            onClick={this.switchTab.bind(this)}
          >
            <AtTabsPane current={currentTab} index={0}>
              <View className="recentPlay__wrapper" >
                {recordList.length > 0 &&
                  recordList.map((item,index) => (
                    <View key={item.song.id} className="recentPlay__music" style={Object.assign(
                      {
                        animationDelay: `${index / recordList.length}s`,
                        animationDuration: '1s'
                      }
                    )}>
                      <View
                        className="recentPlay__music__info"
                        // onClick={this.playSong.bind(
                        //   this,
                        //   item.song.id,
                        //   item.song.st !== -200
                        // )}
                      >
                        <View className="recentPlay__music__info__name">
                          {item.song.name}
                        </View>
                        <View className="recentPlay__music__info__desc">
                          {`${item.song.ar[0] ? item.song.ar[0].name : ""} - ${
                            item.song.al.name
                          }`}
                        </View>
                      </View>
                      <View
                        className="fa fa-ellipsis-v recentPlay__music__icon"
                        // onClick={this.showMore.bind(this)}
                      ></View>
                    </View>
                  ))}
              </View>
            </AtTabsPane>

            <AtTabsPane current={currentTab} index={1}>
              <View className="recentPlay__wrapper">
                {recordList.length > 0 &&
                  recordList.map((item,index) => (
                    <View key={item.song.id} className="recentPlay__music"  style={Object.assign(
                      {
                        animationDelay: `${index / recordList.length}s`,
                        animationDuration:'1s'
                      })}>
                      <View
                        className="recentPlay__music__info"
                        // onClick={this.playSong.bind(
                        //   this,
                        //   item.song.id,
                        //   item.song.st !== -200
                        // )}
                      >
                        <View className="recentPlay__music__info__name">
                          {item.song.name}
                        </View>
                        <View className="recentPlay__music__info__desc">
                          {`${item.song.ar[0] ? item.song.ar[0].name : ""} - ${
                            item.song.al.name
                          }`}
                        </View>
                      </View>
                      <View
                        className="fa fa-ellipsis-v recentPlay__music__icon"
                        // onClick={this.showMore.bind(this)}
                      ></View>
                    </View>
                  ))}
              </View>
            </AtTabsPane>
          </AtTabs>
        </ScrollView>
      </View>
    );
  }
}

Index.config = {
  navigationBarTitleText: "最近播放",
};

export default Index;
