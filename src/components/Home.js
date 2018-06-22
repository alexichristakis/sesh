import React, { Component } from "react";
import {
  Animated,
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";

import codePush from "react-native-code-push";
import LinearGradient from "react-native-linear-gradient";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";
// import RNFS from "react-native-fs";

import Background from "./global/Background";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Groups from "./Groups";
import Active from "./Active";
import Later from "./Later";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../lib/constants";
import { Colors } from "../lib/styles";

/* import fetch functions */
import {} from "../api";

const xOffset = new Animated.Value(0);
const yOffset = new Animated.Value(0);

const activeOffset = new Animated.Value(0);
const laterOffset = new Animated.Value(0);

function Page(props: { children?: ReactElement<*> }) {
  return <View style={{ flex: 1, width: SCREEN_WIDTH }}>{props.children}</View>;
}

function indicatorAnimate() {
  return {
    backgroundColor: xOffset.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [Colors.active, Colors.later]
    }),
    width: xOffset.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [40, 50]
    }),
    transform: [
      {
        translateX: xOffset.interpolate({
          inputRange: [0, SCREEN_WIDTH],
          outputRange: [-SCREEN_WIDTH / 4, SCREEN_WIDTH / 4]
        })
      }
    ]
  };
}

function textColorTransform(index: number) {
  switch (index) {
    case 0:
      return {
        color: xOffset.interpolate({
          inputRange: [0, SCREEN_WIDTH],
          outputRange: [Colors.active, Colors.gray],
          extrapolate: "clamp"
        })
      };
      break;
    case 1:
      return {
        color: xOffset.interpolate({
          inputRange: [0, SCREEN_WIDTH],
          outputRange: [Colors.gray, Colors.later],
          extrapolate: "clamp"
        })
      };
      break;
  }
}

function barTransform(index: number) {
  const base = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 };
  switch (index) {
    case 0:
      return {
        ...base,
        opacity: xOffset.interpolate({
          inputRange: [0, SCREEN_WIDTH / 2, (3 * SCREEN_WIDTH) / 4, SCREEN_WIDTH],
          outputRange: [1, 0.8, 1, 0]
        })
      };
      break;
    case 1:
      return {
        ...base,
        opacity: xOffset.interpolate({
          inputRange: [0, SCREEN_WIDTH / 2, (3 * SCREEN_WIDTH) / 4, SCREEN_WIDTH],
          outputRange: [0, 0.8, 1, 1]
        })
      };
      break;
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      barOpen: true,
      vertScrolling: false,

      user: this.props.user,
      photo: "",

      friends: [],
      groups: [],
      moves: []
    };
  }

  async componentDidMount() {
    // fetch that data
    const url = "https://graph.facebook.com/1779355238751386/picture?type=large";
    this.setState({ photo: url });
    // const path = RNFS.DocumentDirectoryPath + "/profile_pic.png";
    // //
    // await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
    // RNFS.readFile(path, "base64").then(res => {
    // 	console.log("finished");
    // 	this.setState({ photo: "data:image/png;base64," + res, loading: false });
    // });
    // console.log(res);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.barOpen === nextState.barOpen) return false;
    else if (nextState.vertScrolling) return true;
    else if (!this.state.vertScrolling) return false;
    else return false;
  }

  _horizOnScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }], {
    // useNativeDriver: true
  });

  _onHorizScrollEnd = () => {
    if (xOffset._value === 0) yOffset = activeOffset;
    else yOffset = laterOffset;
  };

  _vertOnScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - (yOffset || 0);

    if (this.state.vertScrolling) {
      if (diff <= 0) {
        this.setState({ barOpen: true });
      } else {
        this.setState({ barOpen: false });
      }
    }
    yOffset = currentOffset;
    if (xOffset._value === 0) activeOffset = yOffset;
    else laterOffset = yOffset;
  };

  _onScrollBegin = () => {
    this.setState({ vertScrolling: true });
  };

  _onScrollEnd = () => {
    this.setState({ vertScrolling: false });
  };

  clearScreen = () => {
    if (this.state.barOpen) this.topBar.handleCloseBar();
    this.bottomBar.handleHideBar();
  };

  returnScreen = () => {
    if (this.state.barOpen) this.topBar.handleOpenBar();
    this.bottomBar.handleShowBar();
  };

  onPressPop = () => {
    Navigation.pop(this.props.componentId);
  };

  onPressPushTo = (componentName, props, options) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: componentName,
        passProps: props,
        options: {
          animations: {
            push: {
              enable: false
            },
            pop: {
              enable: false
            }
          },
          ...options
        }
      }
    });
  };

  onPressPresentModalTo = (componentName, props, options) => {
    Navigation.showModal({
      component: {
        name: componentName,
        passProps: props,
        options: options
      }
    });
  };

  onPressPresentOverlayTo = (componentName, props, options) => {
    Navigation.showOverlay({
      component: {
        name: componentName,
        passProps: props,
        options: {
          overlay: {
            interceptTouchOutside: true
          }
        }
      }
    });
  };

  onPressPresentModalToStack = (componentName, props, options) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: componentName,
              passProps: props,
              options: options
            }
          }
        ]
      }
    });
  };

  render() {
    const groupsProps = {
      onPressPushTo: this.onPressPushTo
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Animated.ScrollView
          horizontal
          pagingEnabled
          bounces={false}
          ref={item => (this.scrollView = item)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={this._horizOnScroll}
          onMomentumScrollEnd={this._onHorizScrollEnd}
          style={styles.scroll}
        >
          <Page>
            <Active
              // ref={item => (this.active = item)}
              shortened={!this.state.barOpen}
              profilePic={this.state.photo}
              clearScreen={this.clearScreen}
              returnScreen={this.returnScreen}
              onPressPushTo={this.onPressPushTo}
              onPressPresentOverlayTo={this.onPressPresentOverlayTo}
              _onScrollBegin={this._onScrollBegin}
              _onScrollEnd={this._onScrollEnd}
              _vertOnScroll={this._vertOnScroll}
            />
          </Page>
          <Page>
            <Later
              // ref={item => (this.later = item)}
              shortened={!this.state.barOpen}
              profilePic={this.state.photo}
              clearScreen={this.clearScreen}
              returnScreen={this.returnScreen}
              onPressPushTo={this.onPressPushTo}
              onPressPresentOverlayTo={this.onPressPresentOverlayTo}
              _onScrollBegin={this._onScrollBegin}
              _onScrollEnd={this._onScrollEnd}
              _vertOnScroll={this._vertOnScroll}
            />
          </Page>
        </Animated.ScrollView>

        <TopBar
          ref={item => (this.topBar = item)}
          user={this.state.user}
          onPressPushTo={this.onPressPushTo}
          onPressPresentModalTo={this.onPressPresentModalTo}
          onPressPresentModalToStack={this.onPressPresentModalToStack}
          onPressPresentOverlayTo={this.onPressPresentOverlayTo}
          onPressPop={this.onPressPop}
          groupsProps={groupsProps}
          barTransform={barTransform}
          profilePic={this.state.photo}
          barOpen={this.state.barOpen}
        />

        <BottomBar
          ref={item => (this.bottomBar = item)}
          scrollToStart={() => this.scrollView.getNode().scrollTo({ x: 0, y: 0, animated: true })}
          scrollToEnd={() => this.scrollView.getNode().scrollToEnd()}
          textColorTransform={textColorTransform}
          indicatorAnimate={indicatorAnimate}
          onPressPresentModalTo={this.onPressPresentModalTo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mediumGray
  },
  scroll: {
    flex: 1,
    flexDirection: "row"
  }
});

Home = codePush(Home);
export default Home;
