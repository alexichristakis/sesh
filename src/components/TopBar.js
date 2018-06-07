import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, Image } from "react-native";

// import RNFS from "react-native-fs";
import { BlurView, VibrancyView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import TouchableScale from "./global/TouchableScale";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../lib/constants";
import { Colors, shadow } from "../lib/styles";

const BAR_HEIGHT = 40;
const ICON_DIMENSION = 60;

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      loading: true,
      // photo: RNFS.DocumentDirectoryPath + "/profile_pic.png"
      photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
    };

    this.animated = new Animated.Value(1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open && nextProps.scrollDir.down) this.handleCloseBar();
    else if (!this.state.open && nextProps.scrollDir.up) this.handleOpenBar();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.open && nextState.open) return false;
    else if (!this.state.open && !nextState.open) return false;
    else return true;
  }

  componentDidMount() {
    // fetch that data
    // const url = "https://graph.facebook.com/1779355238751386/picture?type=large";
    // const path = RNFS.DocumentDirectoryPath + "/profile_pic.png";
    // //
    // // await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
    // RNFS.readFile(path, "base64").then(res => {
    // 	// console.log("finished");
    // 	this.setState({ photo: "data:image/png;base64," + res, loading: false });
    // });
    // console.log(res);
  }

  handleCloseBar = () => {
    this.setState({ open: false });
    Animated.timing(this.animated, {
      toValue: 0,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    }).start();
  };

  handleOpenBar = () => {
    this.setState({ open: true });
    Animated.timing(this.animated, {
      toValue: 1,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    }).start();
  };

  hapticModal = (page, props) => () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPressPresentModalTo(page, props);
  };

  hapticOverlay = (page, props) => () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPressPresentOverlayTo(page, props);
  };

  render() {
    /* navigation functions */
    const presentModal = this.props.onPressPresentModalTo;
    const presentStackModal = this.props.onPressPresentModalToStack;
    const pushTo = this.props.onPressPushTo;
    const presentOverlay = this.props.onPressPresentOverlayTo;

    let animatedStyle = {
      opacity: this.animated,
      transform: [
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50]
          })
        },
        {
          scale: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1]
          })
        }
      ]
    };

    let blurContainerAnimatedStyle = {
      transform: [
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [-BAR_HEIGHT - 30, 0]
          })
        }
      ]
    };

    let tabContainerAnimatedStyle = {
      transform: [
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [-BAR_HEIGHT + SB_HEIGHT - 2, BAR_HEIGHT + 4]
          })
        }
      ]
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.animated, blurContainerAnimatedStyle]}>
          <View style={[styles.statusBar, { backgroundColor: Colors.primary, opacity: 0.8 }]} />
          <BlurView blurType="light" style={styles.statusBar} />
        </Animated.View>
        <View style={styles.topBar}>
          <Animated.View style={[styles.addFriendButton, animatedStyle]}>
            <TouchableScale
              style={styles.fillCenter}
              onPress={this.hapticModal("sesh.AddFriend", { user: this.props.user })}
            >
              <Icon name="user-plus" size={30} color={"white"} />
            </TouchableScale>
          </Animated.View>
          <Animated.View style={[styles.profileButton, animatedStyle]}>
            <TouchableScale
              onPress={this.hapticOverlay("sesh.Profile", {
                user: this.props.user,
                onPressPop: this.props.onPressPop
              })}
            >
              <Image style={styles.image} resizeMode="cover" source={{ uri: this.state.photo }} />
            </TouchableScale>
          </Animated.View>

          <Animated.View style={[styles.addGroupButton, animatedStyle]}>
            <TouchableScale
              style={styles.fillCenter}
              onPress={this.hapticModal("sesh.Groups", {
                presentOverlay: presentOverlay,
                presentModal: presentModal
              })}
            >
              <Icon style={{ paddingLeft: 5 }} name="users" size={30} color={"white"} />
            </TouchableScale>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    overflow: "hidden",
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  fillCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  topBar: {
    paddingTop: SB_HEIGHT,
    justifyContent: "space-between",
    flexDirection: "row",
    top: -50
  },
  statusBar: {
    position: "absolute",
    top: -SB_HEIGHT,
    left: 0,
    right: 0,
    height: SB_HEIGHT + BAR_HEIGHT + 30
  },
  animated: {
    position: "absolute",
    left: 0,
    right: 0,
    top: SB_HEIGHT
  },
  title: {
    marginLeft: 50,
    // flex: 1,
    fontSize: 36,
    fontWeight: "900",
    alignSelf: "center"
  },
  textContainer: {
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: "row",
    position: "absolute"
    // padding: 20,
    // top: 60,
    // left: 0,
    // right: 0,
  },
  button: {
    flex: 1
  },
  profileButton: {
    // flex: 3,
    alignItems: "center"
    // flexDirection: "row",
  },
  addFriendButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50
  },
  addGroupButton: {
    // flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",

    // backgroundColor: Colors.groups,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: Colors.gray,
    // borderWidth: 2,
    // borderColor: "white",
    // borderRadius: 25,
    height: 50,
    width: 50
    // ...shadow
  },
  image: {
    flex: 1,
    backgroundColor: Colors.gray,
    borderRadius: ICON_DIMENSION / 2,
    height: ICON_DIMENSION,
    width: ICON_DIMENSION
  },
  text: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center"
    // paddingBottom: 10,
  },
  indicator: {
    top: 22,
    // top: 0,
    height: 3,
    alignSelf: "center",
    borderRadius: 2
  }
});

export default TopBar;
