import React, { Component } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

const ControlledLoadingCircle = props => {
  const wrapperSize = props.size || 20;
  const animationSize = wrapperSize * 3;

  const animationSource = require("../../assets/animations/spinner.json");

  return (
    <View
      style={[
        {
          position: "relative",
          height: wrapperSize,
          width: wrapperSize
        },
        props.style || {}
      ]}
    >
      <View
        style={{
          position: "absolute",
          left: wrapperSize * -1,
          top: wrapperSize * -1,
          height: animationSize,
          width: animationSize
        }}
      >
        <LottieView
          source={animationSource}
          style={{
            height: animationSize,
            width: animationSize
          }}
          progress={props.progress}
        />
      </View>
    </View>
  );
};

export default ControlledLoadingCircle;
