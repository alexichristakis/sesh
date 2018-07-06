import React from "react";
import { Animated, Easing, View } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors, FillAbsolute } from "../lib/styles";

const opacity = new Animated.Value(0);

const Background = props => {
  if (props.loading) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
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

  const backgroundStyle1 = props.loading ? loadingStyle1 : props.backgroundTransform(0);
  const backgroundStyle2 = props.loading ? loadingStyle2 : props.backgroundTransform(1);

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
