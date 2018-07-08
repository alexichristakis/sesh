import React from "react";
import { Animated, TouchableOpacity } from "react-native";

const TouchableScale = props => {
  const animated = new Animated.Value(1);
  const { animatedStyle = {} } = props;

  handlePressIn = () => {
    Animated.spring(animated, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(animated, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  const containerAnimatedStyle = {
    transform: [
      {
        scale: animated
      }
    ]
  };

  return (
    <Animated.View
      pointerEvents={props.disabled ? "none" : "auto"}
      style={[animatedStyle, containerAnimatedStyle]}
    >
      <TouchableOpacity
        style={props.style}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TouchableScale;
