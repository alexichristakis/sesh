import React from "react";
import { StyleSheet, Animated } from "react-native";

import { VibrancyView } from "react-native-blur";

import { SB_HEIGHT } from "../../lib/constants";

const Header = ({ offset }) => {
  const barOpacity = {
    opacity: offset.interpolate({
      inputRange: [0, 200, 210],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    })
  };

  return (
    <Animated.View style={[styles.bar, barOpacity]}>
      <VibrancyView style={styles.flex} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SB_HEIGHT
  },
  flex: { flex: 1 }
});

export default Header;
