import React from "react";
import { Animated, View } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors, FillAbsolute } from "../lib/styles";

const Background = props => (
  <View style={{ flex: 1 }}>
    <Animated.View style={[props.backgroundTransform(0)]}>
      <LinearGradient
        style={FillAbsolute}
        locations={[0.5, 1]}
        colors={[Colors.activeBackground1, Colors.activeBackground2]}
      />
    </Animated.View>
    <Animated.View style={[props.backgroundTransform(1)]}>
      <LinearGradient
        style={FillAbsolute}
        locations={[0.5, 1]}
        colors={[Colors.laterBackground1, Colors.laterBackground2]}
      />
    </Animated.View>
    {props.children}
  </View>
);

export default Background;
