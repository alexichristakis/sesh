import React, { Component } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

export default class LoadingCircle extends Component {
  // const LoadingCircle = props => {
  // animation.play();
  componentDidMount() {
    console.log("mounted");
    this.animation.play();
  }

  render() {
    const wrapperSize = this.props.size || 20;
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
          this.props.style || {}
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
            ref={Lottie => {
              this.animation = Lottie;
            }}
            source={animationSource}
            style={{
              height: animationSize,
              width: animationSize
            }}
            loop
          />
        </View>
      </View>
    );
  }
}

// export default LoadingCircle;
