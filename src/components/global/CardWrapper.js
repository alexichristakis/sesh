import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import TouchableScale from "./TouchableScale";

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
      delay: 50,
      duration: 25,
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
    this.onLeave();
    this.view.measure((x, y, width, height, pageX, pageY) => {
      this.setState({ pageX: pageX, pageY: pageY }, () => {
        const { height, width, x, y } = this.state;
        const dimensions = { height, width, x, y, pageX, pageY };
        this.props.transitionFrom(dimensions, this.onReturn, this.props.data);
      });
    });
  };

  measureCard = event => {
    const { height, width, x, y } = event.nativeEvent.layout;
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
