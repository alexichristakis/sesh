import React, { Component } from "react";
import { StyleSheet, Animated, Easing, View, Text, TouchableOpacity } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SCREEN_HEIGHT, SCREEN_WIDTH, SB_HEIGHT } from "../../lib/constants";
import { Colors } from "../../lib/styles";

const BAR_HEIGHT = 50;

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.animated = new Animated.Value(0);
  }

  haptic = func => () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    func();
  };

  render() {
    const textColorTransform = this.props.textColorTransform;
    const indicatorAnimate = this.props.indicatorAnimate;
    const { scrollToStart, scrollToEnd } = this.props;

    return (
      <View style={styles.container}>
        {/* <View style={[styles.blur, { backgroundColor: Colors.primary, opacity: 0.3 }]} /> */}
        {/* <BlurView style={styles.blur} blurAmount={50} blurType={"light"}> */}
        <View style={styles.textContainer}>
          <TouchableOpacity style={styles.button} onPress={this.haptic(scrollToStart)}>
            <BlurView blurType={"xlight"} style={styles.blur}>
              <Animated.Text style={[styles.text, textColorTransform(0)]}>Now</Animated.Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.haptic(scrollToEnd)}>
            <BlurView blurType={"xlight"} style={styles.blur}>
              <Animated.Text style={[styles.text, textColorTransform(1)]}>Later</Animated.Text>
            </BlurView>
          </TouchableOpacity>
        </View>
        {/* <Animated.View style={[styles.indicator, indicatorAnimate()]} /> */}
        {/* </BlurView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 13,
    // height: SB_HEIGHT + 100,
    // // borderRadius: 15,
    // // borderTopLeftRadius: 100,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // paddingBottom: 20,
    // paddingTop: 5,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // backgroundColor: "blue",
    overflow: "hidden",
    paddingHorizontal: 50,
    // backgroundColor: "blue",
    paddingBottom: SB_HEIGHT === 20 ? 5 : 25
  },
  blur: {
    paddingVertical: 5,
    borderRadius: 15
  },
  button: {
    flex: 1,
    marginHorizontal: 35,
    // paddingVertical: 5,
    // backgroundColor: "white",
    borderRadius: 15
  },
  textContainer: {
    flex: 1,
    flexDirection: "row"
    // marginBottom: 5
    // paddingBottom: 5,
    // backgroundColor: "blue"
    // backgroundColor: "red"
    // paddingBottom: 5
    // backgroundColor: "red",
    // paddingHorizontal: 50
  },
  text: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center"
    // borderWidth: 3,
    // borderColor: "white"
    // paddingBottom: 10
    // paddingBottom: 10,
  },
  indicator: {
    // top: 22,
    // top: 0,
    width: 5,
    height: 5,
    alignSelf: "center",
    borderRadius: 2.5
  }
});

export default NavBar;
