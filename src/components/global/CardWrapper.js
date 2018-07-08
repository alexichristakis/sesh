import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import TouchableScale from "./TouchableScale";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow, cardShadow } from "../../lib/styles";
import { CARD_GUTTER } from "../../lib/constants";

class CardWrapper extends Component {
  constructor(props) {
    super(props);

    this.animatedOpacity = new Animated.Value(0);
    this.state = {
      height: 0,
      width: 0,
      pageX: 0,
      pageY: 0,
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: 150 * this.props.index,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    }).start();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  onLeave = () => {
    Animated.timing(this.animatedOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  onReturn = () => {
    return new Promise(resolve => {
      Animated.timing(this.animatedOpacity, {
        toValue: 1,
        duration: 5,
        useNativeDriver: true
      }).start(() => resolve(true));
    });
  };

  handleOnPress = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.onLeave();
    this.view.measure((x, y, width, height, pageX, pageY) => {
      this.setState({ pageX: pageX, pageY: pageY }, () => {
        const dimensions = {
          height: this.state.height,
          width: this.state.width,
          x: this.state.x,
          y: this.state.y,
          pageX: this.state.pageX,
          pageY: this.state.pageY
        };
        this.props.transitionFrom(dimensions, this.onReturn, this.props.data);
      });
    });
  };

  measureCard = e => {
    const { height, width, x, y } = e.nativeEvent.layout;
    this.setState({ height, width, x, y });
  };

  render() {
    let opacity = {
      opacity: this.animatedOpacity
    };

    return (
      <View ref={view => (this.view = view)} style={styles.container} onLayout={this.measureCard}>
        <TouchableScale animatedStyle={opacity} onPress={this.handleOnPress}>
          {this.props.children}
        </TouchableScale>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: CARD_GUTTER,
    marginBottom: CARD_GUTTER
  }
});

export default CardWrapper;
