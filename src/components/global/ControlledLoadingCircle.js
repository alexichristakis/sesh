import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import Spinner from "../../assets/animations/spinner.json";

const ControlledLoadingCircle = ({ progress, size = 20, style = {} }) => {
  const wrapperSize = size;
  const animationSize = 3 * wrapperSize;

  let wrapperStyle = [
    {
      position: "relative",
      height: wrapperSize,
      width: wrapperSize
    },
    style
  ];

  let lottieContainerStyle = {
    position: "absolute",
    left: wrapperSize * -1,
    top: wrapperSize * -1,
    height: animationSize,
    width: animationSize
  };

  let lottieStyle = {
    height: animationSize,
    width: animationSize
  };

  return (
    <View style={wrapperStyle}>
      <View style={lottieContainerStyle}>
        <LottieView source={Spinner} style={lottieStyle} progress={progress} />
      </View>
    </View>
  );
};

export default ControlledLoadingCircle;
