import React from "react";
import { Animated, Easing, View } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "~/lib/constants";
import { Colors, FillAbsolute } from "~/lib/styles";

const opacity = new Animated.Value(0);

const Background = props => {
  const { xOffset, loading } = props;

  const backgroundTransform = (index: number) => {
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
  };

  if (props.loading) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true
        })
      ])
    ).start();
  }

  const loadingStyle1 = { opacity: opacity };
  const loadingStyle2 = {
    opacity: opacity.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })
  };

  const backgroundStyle1 = loading ? loadingStyle1 : backgroundTransform(0);
  const backgroundStyle2 = loading ? loadingStyle2 : backgroundTransform(1);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[FillAbsolute, backgroundStyle1]}>
        <LinearGradient
          style={FillAbsolute}
          locations={[0.5, 1]}
          colors={[Colors.activeBackground1, Colors.activeBackground2]}
        />
      </Animated.View>
      <Animated.View style={[FillAbsolute, backgroundStyle2]}>
        <LinearGradient
          style={FillAbsolute}
          locations={[0.5, 1]}
          colors={[Colors.laterBackground1, Colors.laterBackground2]}
        />
      </Animated.View>
      {props.children}
    </View>
  );
};

export default Background;
