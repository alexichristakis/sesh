import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

// import RNFS from "react-native-fs";
import LinearGradient from "react-native-linear-gradient";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import { BlurView, VibrancyView } from "react-native-blur";
import FeatherIcon from "react-native-vector-icons/Feather";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import TouchableScale from "./global/TouchableScale";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, TRANSITION_DURATION } from "../lib/constants";
import { Colors, shadow } from "../lib/styles";

const BAR_HEIGHT = 30;
const ICON_DIMENSION = 50;

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };

    this.animated = new Animated.Value(1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open && !nextProps.barOpen) this.handleCloseBar();
    else if (!this.state.open && nextProps.barOpen) this.handleOpenBar();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.open && nextState.open) return false;
    else if (!this.state.open && !nextState.open) return false;
    else return true;
  }

  handleCloseBar = () => {
    this.setState(
      { open: false },
      Animated.timing(this.animated, {
        toValue: 0,
        duration: TRANSITION_DURATION,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true
      }).start()
    );
  };

  handleOpenBar = () => {
    this.setState(
      { open: true },
      Animated.timing(this.animated, {
        toValue: 1,
        duration: TRANSITION_DURATION,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }).start()
    );
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
    const { scrollToStart, scrollToEnd, indicatorAnimate } = this.props;

    const { colorTransform } = this.props;

    let animatedStyle = {
      opacity: this.animated,
      transform: [
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, ICON_DIMENSION]
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
      opacity: this.animated.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      })
    };

    return (
      <View style={styles.container}>
        <Animated.View style={blurContainerAnimatedStyle}>
          <BlurView blurType={"xlight"} style={styles.statusBar} />
        </Animated.View>
        <View style={{ top: 0 }}>
          <View style={styles.topBar}>
            {/* <Animated.View style={[{ backgroundColor: "blue" }, ]}> */}
            <Animated.View style={[styles.textContainer, animatedStyle, indicatorAnimate(0)]}>
              <TouchableScale style={styles.fillCenter} onPress={scrollToStart}>
                {/* <Text style={styles.text}>Now</Text> */}
                <AwesomeIcon name={"bolt"} size={24} color={"white"} />
              </TouchableScale>
            </Animated.View>
            {/* </Animated.View> */}
            {/* <Animated.View style={indicatorAnimate(1)}> */}
            <Animated.View style={[styles.textContainer, animatedStyle, indicatorAnimate(1)]}>
              <TouchableScale style={styles.fillCenter} onPress={scrollToEnd}>
                {/* <Text style={styles.text}>Later</Text> */}
                <AwesomeIcon name={"clock-o"} size={24} color={"white"} />
              </TouchableScale>
            </Animated.View>
            {/* </Animated.View> */}
          </View>
          {/* <Animated.View style={[{ top: 0 }, animatedStyle]}>
            <Animated.View style={[styles.indicator, indicatorAnimate()]} />
          </Animated.View> */}
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
    right: 0
    // backgroundColor: "blue"
  },
  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SB_HEIGHT
  },
  topBar: {
    flex: 1,
    // paddingTop: SB_HEIGHT,
    // paddingHorizontal: 102,
    paddingHorizontal: SCREEN_WIDTH / 3,
    justifyContent: "space-between",
    flexDirection: "row",
    top: 0
  },
  textContainer: {
    top: SB_HEIGHT + 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red"
    // height: 50,
    // width: 50
  },
  text: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    color: "white"
    // paddingBottom: 10,
  },
  indicator: {
    // top: SB_HEIGHT + 25,
    top: 0,
    backgroundColor: "white",
    height: 4,
    // width: 50,
    alignSelf: "center",
    borderRadius: 2
  }
});

export default TopBar;
