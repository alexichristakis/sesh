import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import AwesomeIcon from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

import ControlledLoadingCircle from "../global/ControlledLoadingCircle";
import LoadingCircle from "../global/LoadingCircle";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  IS_X,
  REFRESH_OFFSET,
  TRANSITION_DURATION
} from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";
import { GetPhotoURL } from "../../lib/functions";
import { ShowProfile } from "../../lib/navigation";

const BAR_HEIGHT = 40;
const ICON_DIMENSION = 50;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const TopBar = ({ yOffset, xOffset, user, scrollToStart, scrollToEnd, refreshing }) => {
  const initialOffset = IS_X ? -44 : -20;
  const animatedProgress = new Animated.Value(0);

  const indicatorAnimate = (index: number) => {
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
  };

  if (refreshing) {
    Animated.loop(
      Animated.timing(animatedProgress, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      })
    ).start();
  }

  let progress = refreshing
    ? animatedProgress
    : yOffset.interpolate({
        inputRange: [REFRESH_OFFSET, (3 * REFRESH_OFFSET) / 4, REFRESH_OFFSET / 2, initialOffset],
        outputRange: [1, 0.8, 0.2, 0],
        extrapolate: "clamp"
      });

  let animatedStyle = {
    opacity: yOffset.interpolate({
      inputRange: [REFRESH_OFFSET, -100, initialOffset, BAR_HEIGHT],
      outputRange: [0, 0.8, 1, 1]
    }),
    transform: [
      {
        translateY: yOffset.interpolate({
          inputRange: [REFRESH_OFFSET, initialOffset, BAR_HEIGHT],
          outputRange: [40, 0, IS_X ? -ICON_DIMENSION / 3 : -ICON_DIMENSION / 6],
          extrapolateRight: "clamp"
        })
      },
      {
        scale: yOffset.interpolate({
          inputRange: [REFRESH_OFFSET, initialOffset, BAR_HEIGHT],
          outputRange: [1.5, 1, 0.8],
          extrapolate: "clamp"
        })
      }
    ]
  };

  const iPhoneXOffset = IS_X ? 18 : 0;
  let animatedLoading = {
    opacity: refreshing
      ? 1
      : yOffset.interpolate({
          inputRange: [-50, initialOffset],
          outputRange: [1, 0],
          extrapolate: "clamp"
        }),
    transform: [
      {
        translateY: yOffset.interpolate({
          inputRange: [REFRESH_OFFSET, initialOffset, 0],
          outputRange: [47 + iPhoneXOffset, 7 + iPhoneXOffset, 0],
          extrapolateRight: "clamp"
        })
      },
      {
        scale: yOffset.interpolate({
          inputRange: [1.5 * REFRESH_OFFSET, REFRESH_OFFSET, initialOffset, 0],
          outputRange: [1.4, 1.2, refreshing ? 1 : 0.2, 0],
          extrapolateRight: "clamp"
        })
      }
    ]
  };

  let shadowOpacity = {
    opacity: yOffset.interpolate({
      inputRange: [0, 30],
      outputRange: [0, 1],
      extrapolate: "clamp"
    })
  };

  let animatedProfilePicture = {
    opacity: yOffset.interpolate({
      inputRange: [REFRESH_OFFSET, initialOffset, BAR_HEIGHT],
      outputRange: [0, 1, 1]
    }),
    transform: [
      {
        translateY: yOffset.interpolate({
          inputRange: [REFRESH_OFFSET, initialOffset, BAR_HEIGHT],
          outputRange: [35, 0, IS_X ? -10 : -5],
          extrapolateRight: "clamp"
        })
      }
      // {
      //   scale: yOffset.interpolate({
      //     inputRange: [REFRESH_OFFSET, initialOffset, BAR_HEIGHT],
      //     outputRange: [1.1, 1, 0.8],
      //     extrapolateRight: "clamp"
      //   })
      // }
    ]
  };

  let animatedScale = {
    transform: [
      {
        scale: yOffset.interpolate({
          inputRange: [REFRESH_OFFSET, initialOffset, BAR_HEIGHT],
          outputRange: [1.1, 1, 0.75],
          extrapolateRight: "clamp"
        })
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.shadowContainer, shadowOpacity]}>
        <LinearGradient
          style={styles.flex}
          // locations={[0.25, 0.5, 0.75, 1]}
          // colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0)"]}
          locations={[0.25, 1]}
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0)"]}
        />
      </Animated.View>
      {!refreshing && (
        <>
          <Animated.View style={[styles.topBar, animatedStyle]}>
            <AnimatedTouchable
              style={[styles.textContainer, indicatorAnimate(0)]}
              onPress={scrollToStart}
            >
              <AwesomeIcon name={"bolt"} size={42} color={"white"} />
            </AnimatedTouchable>
            <AnimatedTouchable
              style={[styles.textContainer, indicatorAnimate(1)]}
              onPress={scrollToEnd}
            >
              <IonIcon name={"ios-time"} size={42} color={"white"} />
            </AnimatedTouchable>
          </Animated.View>
          <AnimatedTouchable
            style={[animatedProfilePicture, styles.profileButton]}
            onPress={ShowProfile}
          >
            <Animated.Image
              source={{ uri: GetPhotoURL(user.fb_id, ICON_DIMENSION, ICON_DIMENSION) }}
              style={[animatedScale, styles.photo]}
            />
          </AnimatedTouchable>
        </>
      )}
      <Animated.View style={[styles.loading, animatedLoading]}>
        <ControlledLoadingCircle progress={progress} size={20} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: BAR_HEIGHT + SB_HEIGHT
    // backgroundColor: "blue"
  },
  profileButton: {
    position: "absolute",
    right: 10,
    top: SB_HEIGHT
  },
  photo: {
    height: ICON_DIMENSION,
    width: ICON_DIMENSION,
    borderRadius: ICON_DIMENSION / 2,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: Colors.gray
  },
  shadowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: IS_X ? 90 : 70
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
    paddingHorizontal: 90,
    justifyContent: "space-around",
    flexDirection: "row",
    top: 0
  },
  textContainer: {
    top: SB_HEIGHT + 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: IS_X ? 15 : 5,
    paddingHorizontal: 30
    // backgroundColor: "red"
    // height: 50,
    // width: 50
  },
  loading: {
    position: "absolute",
    top: IS_X ? SB_HEIGHT + 5 : SB_HEIGHT + 15,
    alignSelf: "center"
  },
  refreshing: {
    alignSelf: "center",
    paddingTop: 50
  },
  flex: {
    flex: 1
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
