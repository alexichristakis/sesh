import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Image, Text } from "react-native";
import PropTypes from "prop-types";

import { Navigation } from "react-native-navigation";

import Background from "./Background";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, TRANSITION_DURATION } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

class Transition extends Component {
  constructor(props) {
    super(props);

    this.openProgress = new Animated.Value(0);

    this.state = {
      open: false,
      MoveComponent: null,
      onReturn: null,
      sourceDimension: {
        height: 0,
        width: 0,
        pageX: 0,
        pageY: 0
      }
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const { MoveComponent } = nextProps;
  //   if (MoveComponent) {
  //     this.setState({ MoveComponent: MoveComponent, open: true });
  //   }
  // }

  beginTransition = (MoveComponent, source, onReturn, data, props) => {
    this.setState({
      MoveComponent: MoveComponent,
      open: true,
      onReturn: onReturn,
      sourceDimension: {
        height: source.height,
        width: source.width,
        x: source.x,
        y: source.y,
        pageX: source.pageX,
        pageY: source.pageY
      }
    });
    this.openCard(source, onReturn, data, props);
  };

  openCard = (source, onReturn, data, props) => {
    this.props.clearScreen();
    Animated.timing(this.openProgress, {
      toValue: 1,
      duration: TRANSITION_DURATION,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
      this.props.onPressPushTo(this.props.destinationPage, {
        ...props,
        cardHeight: this.state.sourceDimension.height,
        data: data,
        closeCard: this.closeCard
      });
    });
  };

  closeCard = () => {
    this.props.returnScreen();
    setTimeout(() => {
      this.state.onReturn();
    }, TRANSITION_DURATION - 5);
    Animated.timing(this.openProgress, {
      toValue: 0,
      duration: TRANSITION_DURATION,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start(() => {
      this.setState({ open: false });
    });
  };

  render() {
    const { height, width, x, y, pageX, pageY } = this.state.sourceDimension;

    let cardAnimatedStyle = {
      position: "absolute",
      left: 7,
      right: 7,
      transform: [
        {
          translateY: this.openProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [pageY, SB_HEIGHT + 10]
          })
        }
      ]
    };

    if (this.state.open) {
      return (
        <View shouldRasterizeIOS style={styles.container}>
          <Animated.View style={cardAnimatedStyle}>{this.state.MoveComponent}</Animated.View>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "transparent"
  },
  cover: {
    flex: 1,
    backgroundColor: Colors.lightGray
  }
});

Transition.propTypes = {
  // MoveComponent: PropTypes.ReactElement.isRequired,
  transitionFinished: PropTypes.func,
  // clearScreen: PropTypes.func.isRequired,
  // returnScreen: PropTypes.func.isRequired,
  onPressPushTo: PropTypes.func.isRequired
};

export default Transition;
