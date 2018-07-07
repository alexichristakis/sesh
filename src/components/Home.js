import React, { Component } from "react";
import { Animated, View, StatusBar, StyleSheet } from "react-native";

import codePush from "react-native-code-push";
import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

// import RNFS from "react-native-fs";

import LoadingCircle from "./global/LoadingCircle";
import Background from "./Background";
import Drawer from "./Drawer";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Groups from "./Groups";
import Active from "./Active";
import Later from "./Later";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../lib/constants";
import { Colors, FillAbsolute } from "../lib/styles";

/* import fetch functions */
import {} from "../api";

/* to replace with data from firestore */
import GROUPS from "../mock-data/GROUPS";
import MOVES from "../mock-data/MOVES";
import FRIENDS from "../mock-data/FRIENDS";
/*                                     */

xOffset = new Animated.Value(0);
yOffset = new Animated.Value(SB_HEIGHT === 40 ? -4 : 0);

activeOffset = new Animated.Value(0);
laterOffset = new Animated.Value(0);

function Page(props: { children?: ReactElement<*> }) {
  return <View style={{ flex: 1, width: SCREEN_WIDTH }}>{props.children}</View>;
}

function indicatorAnimate(index: number) {
  switch (index) {
    case 0:
      return {
        transform: [
          {
            scale: xOffset.interpolate({
              inputRange: [0, SCREEN_WIDTH],
              outputRange: [1, 0.5]
            })
          }
        ]
      };
      break;
    case 1:
      return {
        transform: [
          {
            scale: xOffset.interpolate({
              inputRange: [0, SCREEN_WIDTH],
              outputRange: [0.5, 1]
            })
          }
        ]
      };
      break;
  }
}

// function textColorTransform(index: number) {
//   switch (index) {
//     case 0:
//       return {
//         color: xOffset.interpolate({
//           inputRange: [0, SCREEN_WIDTH],
//           outputRange: [Colors.active, Colors.gray],
//           extrapolate: "clamp"
//         })
//       };
//       break;
//     case 1:
//       return {
//         color: xOffset.interpolate({
//           inputRange: [0, SCREEN_WIDTH],
//           outputRange: [Colors.gray, Colors.later],
//           extrapolate: "clamp"
//         })
//       };
//       break;
//   }
// }

function backgroundTransform(index: number) {
  switch (index) {
    case 0:
      return {
        opacity: xOffset.interpolate({
          inputRange: [0, SCREEN_WIDTH / 2, (3 * SCREEN_WIDTH) / 4, SCREEN_WIDTH],
          outputRange: [1, 0.8, 1, 0]
        })
      };
      break;
    case 1:
      return {
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

    yOffset.addListener(this.handleRefresh);
    this.state = {
      loading: true,
      refreshing: false,

      barOpen: true,
      focused: false,
      vertScrolling: false,

      user: this.props.user,
      photo: "https://graph.facebook.com/1779355238751386/picture?type=large",
      coords: { latitude: null, longitude: null },

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

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ coords: position.coords, loading: false });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.barOpen !== nextState.barOpen) return true;
    else if (this.state.focused !== nextState.focused) return true;
    else if (this.state.loading !== nextState.loading) return true;
    else if (this.state.refreshing !== nextState.refreshing) return true;
    else return false;
    // if (this.state.barOpen === nextState.barOpen) return false;
    // else if (nextState.vertScrolling) return true;
    // else if (!this.state.vertScrolling) return false;
    // else if (this.state.focused !== nextState.focused) return true;
    // else return false;
  }

  _horizOnScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }], {
    useNativeDriver: true
  });

  _vertOnScroll = Animated.event([{ nativeEvent: { contentOffset: { y: yOffset } } }], {
    useNativeDriver: true
  });

  _onHorizScrollEnd = () => {
    // if (xOffset._value === 0) yOffset = activeOffset;
    // else yOffset = laterOffset;
  };

  // _vertOnScroll = event => {
  //   const currentOffset = event.nativeEvent.contentOffset.y;
  //   const diff = currentOffset - (yOffset || 0);
  //
  //   if (this.state.vertScrolling) {
  //     if (diff <= 0) {
  //       this.setState({ barOpen: true });
  //     } else {
  //       this.setState({ barOpen: false });
  //     }
  //   }
  //   yOffset = currentOffset;
  //   if (xOffset._value === 0) activeOffset = yOffset;
  //   else laterOffset = yOffset;
  // };

  _onScrollBegin = () => {
    this.setState({ vertScrolling: true });
  };

  _onScrollEnd = () => {
    this.setState({ vertScrolling: false });
  };

  handleTransition = props => {
    this.setState({ focused: true }, () =>
      this.onPressPresentOverlayTo("sesh.Focus", {
        ...props,
        coords: this.state.coords,
        returnScreen: this.returnScreen,
        onPressPresentOverlayTo: this.onPressPresentOverlayTo
      })
    );
  };

  returnScreen = () => {
    this.setState({ focused: false });
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

  handleRefresh = event => {
    const { value } = event;

    if (value <= -150) {
      console.log("refresh!!");

      // this.setState({ refreshing: true });
      if (!this.state.refreshing) {
        this.setState({ refreshing: true }, () => {
          ReactNativeHapticFeedback.trigger("impactHeavy");
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 2000);
        });
      }
    }
  };

  render() {
    const groupsProps = {
      onPressPushTo: this.onPressPushTo
    };

    let feed = (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={ScrollView => (this.scrollView = ScrollView)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={this._horizOnScroll}
        onMomentumScrollEnd={this._onHorizScrollEnd}
        style={styles.scroll}
      >
        <Page>
          <Active
            handleRefresh={this.handleRefresh}
            refreshing={this.state.loading}
            shortened={!this.state.barOpen}
            profilePic={this.state.photo}
            handleTransition={this.handleTransition}
            onPressPushTo={this.onPressPushTo}
            onPressPresentOverlayTo={this.onPressPresentOverlayTo}
            _onScrollBegin={this._onScrollBegin}
            _onScrollEnd={this._onScrollEnd}
            _vertOnScroll={this._vertOnScroll}
            data={{ moves: MOVES, groups: GROUPS, coords: this.state.coords }}
          />
        </Page>
        <Page>
          <Later
            shortened={!this.state.barOpen}
            profilePic={this.state.photo}
            handleTransition={this.handleTransition}
            onPressPushTo={this.onPressPushTo}
            onPressPresentOverlayTo={this.onPressPresentOverlayTo}
            _onScrollBegin={this._onScrollBegin}
            _onScrollEnd={this._onScrollEnd}
            _vertOnScroll={this._vertOnScroll}
            data={{ moves: MOVES, groups: GROUPS, coords: this.state.coords }}
          />
        </Page>
      </Animated.ScrollView>
    );

    return (
      <Background
        loading={this.state.loading || this.state.refreshing}
        backgroundTransform={backgroundTransform}
      >
        <StatusBar barStyle="light-content" />

        {this.state.loading && <LoadingCircle style={styles.loading} size={20} />}
        {!this.state.loading && feed}

        <TopBar
          yOffset={yOffset}
          refreshing={this.state.refreshing}
          indicatorAnimate={indicatorAnimate}
          barOpen={this.state.barOpen}
          scrollToStart={() => this.scrollView.getNode().scrollTo({ x: 0, y: 0, animated: true })}
          scrollToEnd={() => this.scrollView.getNode().scrollToEnd()}
        />

        <Drawer
          loading={this.state.loading}
          // userLocation={this.state.coords}
          photo={this.state.photo}
          data={{ moves: MOVES, groups: GROUPS, userLocation: this.state.coords }}
        />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: "row"
  },
  loading: {
    alignSelf: "center",
    marginTop: 150
  }
});

// Home = codePush(Home);
export default Home;
