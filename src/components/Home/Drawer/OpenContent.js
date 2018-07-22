import React from "react";
import { StyleSheet, Animated, View, Image, TouchableOpacity } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import FeatherIcon from "react-native-vector-icons/Feather";
import MapCard from "../../global/MapCard";

import { GenerateMarkers } from "../../../lib/functions";
import { Colors } from "../../../lib/styles";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  ANIMATION_DURATION,
  CARD_GUTTER,
  DRAWER_HEIGHT
} from "../../../lib/constants";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const BUTTON_SIZE = 40;
const ICON_SIZE = 60;

const OpenContent = props => {
  const { moves, deltaY, photo, userLocation, open, toggleDrawer } = props;

  let animatedOpacity = {
    opacity: deltaY.interpolate({
      inputRange: [0, SB_HEIGHT, SCREEN_HEIGHT],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    })
  };

  return (
    <SuperEllipseMask radius={{ topRight: 20, topLeft: 20 }}>
      <MapCard
        fullBleed
        height={SCREEN_HEIGHT - SB_HEIGHT - 5}
        markers={GenerateMarkers(moves)}
        loading={!open}
        userLocation={userLocation}
      />
      <View style={styles.bottomBuffer} />
      <Image source={{ uri: photo }} style={styles.photo} />
      <AnimatedTouchable style={[styles.buttonContainer, animatedOpacity]} onPress={toggleDrawer}>
        <VibrancyView blurAmount={20} blurType="dark" style={styles.vibrancy}>
          <FeatherIcon style={styles.icon} name={"chevron-down"} size={28} color={"white"} />
        </VibrancyView>
      </AnimatedTouchable>
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  photo: {
    position: "absolute",
    right: 2 * CARD_GUTTER,
    bottom: SB_HEIGHT === 40 ? 30 : 2 * CARD_GUTTER,
    height: ICON_SIZE,
    width: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: Colors.gray
  },
  buttonContainer: {
    position: "absolute",
    top: 5,
    alignSelf: "center"
  },
  vibrancy: {
    paddingHorizontal: 20,
    borderRadius: 15
  },
  bottomBuffer: { width: SCREEN_WIDTH, height: 10, backgroundColor: "#F9F5ED" },
  icon: { transform: [{ scaleX: 1.5 }] }
});

export default OpenContent;
