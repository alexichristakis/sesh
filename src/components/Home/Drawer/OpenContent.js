import React from "react";
import { StyleSheet, Animated, Image, TouchableOpacity } from "react-native";

import { VibrancyView } from "react-native-blur";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import FeatherIcon from "react-native-vector-icons/Feather";
import MapCard from "../../global/MapCard";

import { GenerateMarkers, GetPhotoURL } from "../../../lib/functions";
import { Colors } from "../../../lib/styles";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  BAR_HEIGHT,
  IS_X,
  ANIMATION_DURATION,
  CARD_GUTTER,
  DRAWER_HEIGHT
} from "../../../lib/constants";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const BUTTON_SIZE = 40;
const ICON_SIZE = 60;

const OpenContent = ({ loading, moves, deltaY, user, open, toggleDrawer, showProfileScreen }) => {
  let animatedOpacity = {
    opacity: deltaY.interpolate({
      inputRange: [0, SB_HEIGHT, SCREEN_HEIGHT],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    })
  };

  return (
    <SuperEllipseMask style={styles.container} radius={{ topRight: 20, topLeft: 20 }}>
      <MapCard
        fullBleed
        height={SCREEN_HEIGHT - SB_HEIGHT - 5}
        markers={GenerateMarkers(moves)}
        loading={!open || loading}
        userLocation={user.location}
      />
      <TouchableOpacity style={styles.profileButton} onPress={showProfileScreen}>
        <Image
          source={{ uri: GetPhotoURL(user.fb_id, ICON_SIZE, ICON_SIZE) }}
          style={styles.photo}
        />
      </TouchableOpacity>
      <AnimatedTouchable style={[styles.buttonContainer, animatedOpacity]} onPress={toggleDrawer}>
        <VibrancyView blurAmount={20} blurType="dark" style={styles.vibrancy}>
          <FeatherIcon style={styles.icon} name={"chevron-down"} size={28} color={"white"} />
        </VibrancyView>
      </AnimatedTouchable>
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: "#F9F5ED"
  },
  profileButton: {
    position: "absolute",
    right: 2 * CARD_GUTTER,
    bottom: IS_X ? 80 : 2 * CARD_GUTTER + 25
  },
  photo: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
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
  icon: { transform: [{ scaleX: 1.5 }] }
});

export default OpenContent;
