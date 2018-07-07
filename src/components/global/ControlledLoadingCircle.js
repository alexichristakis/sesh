import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const ControlledLoadingCircle = props => {
  const wrapperSize = props.size || 20;
  const animationSize = 3 * wrapperSize;

  const animationSource = require("../../assets/animations/spinner.json");

  const wrapperStyle = [
    {
      position: "relative",
      height: wrapperSize,
      width: wrapperSize
    },
    props.style || {}
  ];

  const lottieContainerStyle = {
    position: "absolute",
    left: wrapperSize * -1,
    top: wrapperSize * -1,
    height: animationSize,
    width: animationSize
  };

  const lottieStyle = {
    height: animationSize,
    width: animationSize
  };

  return (
    <View style={wrapperStyle}>
      <View style={lottieContainerStyle}>
        <LottieView source={animationSource} style={lottieStyle} progress={props.progress} />
      </View>
    </View>
  );
};

export default ControlledLoadingCircle;
