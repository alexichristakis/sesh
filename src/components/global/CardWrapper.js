import React, { Component } from "react";
import { Animated, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import TouchableScale from "./TouchableScale";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow, cardShadow } from "../../lib/styles";

class CardWrapper extends Component {
  constructor(props) {
    super(props);

    this.animated = new Animated.Value(1);
    this.entry = new Animated.Value(1);
    this.openProgress = new Animated.Value(0);
    this.state = {
      open: false,
      height: 0,
      width: 0,
      pageX: 0,
      pageY: 0,
      x: 0,
      y: 0
    };
  }

  onLeave = () => {
    Animated.timing(this.entry, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true
    }).start();
  };

  onReturn = () => {
    Animated.timing(this.entry, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true
    }).start();
  };

  handleOnPress = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.onLeave();
    this.view.getNode().measure((x, y, width, height, pageX, pageY) => {
      this.setState({ pageX: pageX, pageY: pageY });
      const dimensions = {
        height: this.state.height,
        width: this.state.width,
        x: this.state.x,
        y: this.state.y,
        pageX: this.state.pageX,
        pageY: this.state.pageY
      };
      this.props.transitionFrom(dimensions, this.onReturn, this.props.data, this.props.children);
    });
  };

  measureCard = e => {
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    });
  };

  render() {
    let containerAnimatedStyle = {
      opacity: this.entry,
      transform: [
        {
          scale: this.animated
        }
      ]
    };

    let opacity = {
      opacity: this.entry
    };

    return (
      <Animated.View
        ref={view => (this.view = view)}
        style={[styles.container, opacity]}
        onLayout={this.measureCard}
      >
        <TouchableScale onPress={this.handleOnPress}>{this.props.children}</TouchableScale>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: 8
  }
});

export default CardWrapper;
