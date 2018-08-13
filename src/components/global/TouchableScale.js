import React from "react";
import { Animated, TouchableOpacity } from "react-native";

const TouchableScale = props => {
  const { animatedStyle = {}, style = {}, disabled, onPress, children } = props;
  const animated = new Animated.Value(1);

  handlePressIn = () => {
    Animated.spring(animated, {
      toValue: 0.9,
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
      pointerEvents={disabled ? "none" : "auto"}
      style={[animatedStyle, containerAnimatedStyle]}
    >
      <TouchableOpacity
        style={style}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TouchableScale;
