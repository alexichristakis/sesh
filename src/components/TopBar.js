import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";

import TouchableScale from "./global/TouchableScale";
import ControlledLoadingCircle from "./global/ControlledLoadingCircle";
import LoadingCircle from "./global/LoadingCircle";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, TRANSITION_DURATION } from "../lib/constants";
import { Colors, shadow } from "../lib/styles";

const BAR_HEIGHT = 30;
const ICON_DIMENSION = 50;

const TopBar = props => {
  const { yOffest, scrollToStart, scrollToEnd, indicatorAnimate, refreshing } = props;
  const initialOffset = SB_HEIGHT === 40 ? -4 : 0;

  let animatedStyle = {
    opacity: yOffset.interpolate({
      inputRange: [-150, -100, initialOffset, BAR_HEIGHT],
      outputRange: [0, 0.8, 1, 0]
    }),
    transform: [
      {
        translateY: yOffset.interpolate({
          inputRange: [-150, initialOffset, BAR_HEIGHT],
          outputRange: [50, 0, -ICON_DIMENSION]
          // extrapolate: "clamp"
        })
      },
      {
        scale: yOffset.interpolate({
          inputRange: [-150, initialOffset, BAR_HEIGHT],
          outputRange: [1.5, 1, 0.8],
          extrapolate: "clamp"
        })
      }
    ]
  };

  let progress = yOffset.interpolate({
    inputRange: [-200, -150, -100, initialOffset],
    outputRange: [1, 0.8, 0.2, 0],
    extrapolate: "clamp"
  });

  const iPhoneXOffset = SB_HEIGHT === 40 ? 18 : 0;
  let progressiveLoading = {
    opacity: yOffset.interpolate({
      inputRange: [-50, initialOffset],
      outputRange: [1, 0]
    }),
    transform: [
      {
        translateY: yOffset.interpolate({
          inputRange: [-150, initialOffset],
          outputRange: [57 + iPhoneXOffset, 7 + iPhoneXOffset]
          // extrapolate: "clamp"
        })
      },
      {
        scale: yOffset.interpolate({
          inputRange: [-150, initialOffset],
          outputRange: [1, 0.2],
          extrapolate: "clamp"
        })
      }
    ]
  };

  let refresh = {
    opacity: refreshing ? 1 : 0,
    transform: [
      {
        translateY: yOffset.interpolate({
          inputRange: [-150, initialOffset],
          outputRange: [102 + iPhoneXOffset, 32 + iPhoneXOffset]
          // extrapolate: "clamp"
        })
      },
      {
        scale: yOffset.interpolate({
          inputRange: [-150, initialOffset],
          outputRange: [1, 0.8],
          extrapolate: "clamp"
        })
      }
    ]
  };

  return (
    <View style={styles.container}>
      {!props.refreshing && (
        <View>
          <Animated.View style={[styles.topBar, animatedStyle]}>
            <Animated.View style={[styles.textContainer, indicatorAnimate(0)]}>
              <TouchableScale style={styles.fillCenter} onPress={scrollToStart}>
                <AwesomeIcon name={"bolt"} size={36} color={"white"} />
              </TouchableScale>
            </Animated.View>
            <Animated.View style={[styles.textContainer, indicatorAnimate(1)]}>
              <TouchableScale style={styles.fillCenter} onPress={scrollToEnd}>
                <IonIcon name={"ios-time"} size={36} color={"white"} />
              </TouchableScale>
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.loading, progressiveLoading]}>
            <ControlledLoadingCircle progress={progress} size={20} />
          </Animated.View>
        </View>
      )}
      <Animated.View style={[styles.loading, refresh]}>
        <LoadingCircle size={20} />
      </Animated.View>
    </View>
  );
};

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
    top: SB_HEIGHT + 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red"
    // height: 50,
    // width: 50
  },
  loading: {
    alignSelf: "center"
  },
  refreshing: {
    alignSelf: "center",
    paddingTop: 50
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
