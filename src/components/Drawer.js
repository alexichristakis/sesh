import React, { Component } from "react";
import { StyleSheet, Easing, Animated, View, Text, Image } from "react-native";

import Interactable from "react-native-interactable";
import { BlurView } from "react-native-blur";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";

import TouchableScale from "./global/TouchableScale";

import { Colors, FillAbsolute, heavyShadow } from "../lib/styles";
import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, ANIMATION_DURATION } from "../lib/constants";

const BUTTON_SIZE = 40;
const ICON_DIMENSION = 50;
const DRAWER_HEIGHT = 80;

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.animated = new Animated.Value(0);
    this.state = {
      hidden: false
    };
  }

  handleHideDrawer = () => {
    Animated.timing(this.animated, {
      toValue: 1,
      delay: 50,
      duration: 100,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true
    }).start();
  };

  handleShowDrawer = () => {
    Animated.timing(this.animated, {
      toValue: 0,
      delay: 50,
      duration: 100,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true
    }).start();
  };

  componentWillReceiveProps(nextProps) {
    console.log("next props: ", nextProps.hidden);
    if (nextProps.hidden) this.setState({ hidden: true }, this.handleHideDrawer());
    else if (!nextProps.hidden) this.setState({ hidden: false }, this.handleShowDrawer());
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.hidden === nextState.hidden) return false;
  //   else return true;
  // }

  render() {
    const closed = { y: SCREEN_HEIGHT - DRAWER_HEIGHT };
    const open = { y: SB_HEIGHT + 2 };

    let animatedTranslate = {
      transform: [
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, DRAWER_HEIGHT]
          })
        }
      ]
    };

    return (
      <Animated.View style={[FillAbsolute, animatedTranslate]} pointerEvents={"box-none"}>
        <Interactable.View
          animatedNativeDriver
          ref={view => (this.interactable = view)}
          verticalOnly={true}
          snapPoints={[open, closed]}
          boundaries={{
            top: SB_HEIGHT - 5,
            bottom: SCREEN_HEIGHT - DRAWER_HEIGHT + 5,
            haptics: true
          }}
          initialPosition={closed}
          // animatedValueY={this.deltaY}
        >
          <View style={styles.curveContainer}>
            <BlurView blurType={"xlight"} blurAmount={15} style={styles.curve} />
          </View>
          <View style={styles.background} />
          <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
            <View style={styles.actionButtonContainer}>
              <TouchableScale onPress={() => console.log("hello!")}>
                <View style={styles.button}>
                  <View style={{ flexDirection: "row" }}>
                    <AwesomeIcon name={"bolt"} size={30} color={Colors.activeBackground1} />
                    <FeatherIcon name={"plus"} size={14} color={Colors.activeBackground1} />
                  </View>
                </View>
              </TouchableScale>
              <TouchableScale onPress={() => console.log("hello!")}>
                <Image source={{ uri: this.props.photo }} style={styles.photo} />
              </TouchableScale>
              <TouchableScale onPress={() => console.log("hello!")}>
                <View style={styles.button}>
                  <View style={{ flexDirection: "row" }}>
                    <AwesomeIcon name={"clock-o"} size={30} color={Colors.laterBackground1} />
                    <FeatherIcon name={"plus"} size={14} color={Colors.laterBackground1} />
                  </View>
                </View>
              </TouchableScale>
            </View>
          </View>
        </Interactable.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef"
  },
  curveContainer: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: DRAWER_HEIGHT + 5,

    // paddingTop: 50,
    overflow: "hidden",
    // backgroundColor: "red",
    ...heavyShadow
  },
  curve: {
    position: "absolute",
    top: 5,
    borderRadius: SCREEN_WIDTH * 2,
    left: -SCREEN_WIDTH * 1.5,
    height: SCREEN_WIDTH * 4,
    width: SCREEN_WIDTH * 4,
    // borderWidth: 0.1,
    // borderColor: Colors.gray,
    transform: [{ rotateZ: "45deg" }]
    // // backgroundColor: Colors.secondary
  },
  background: {
    position: "absolute",
    top: DRAWER_HEIGHT,
    height: SCREEN_HEIGHT - DRAWER_HEIGHT,
    width: SCREEN_WIDTH,
    // backgroundColor: Colors.lightGray
    backgroundColor: "blue"
  },
  actionButtonContainer: {
    flexDirection: "row",
    paddingHorizontal: 80,
    width: SCREEN_WIDTH,
    height: DRAWER_HEIGHT,
    alignItems: "center",
    justifyContent: "space-between",
    // paddingVertical: 10
    paddingBottom: SB_HEIGHT === 40 ? 10 : 0
  },
  button: {
    // backgroundColor: Colors.activeBackground1,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    height: ICON_DIMENSION,
    width: ICON_DIMENSION,
    borderRadius: ICON_DIMENSION / 2,
    backgroundColor: Colors.gray
  },
  panel: {
    flex: 1
  }
});

export default Drawer;
