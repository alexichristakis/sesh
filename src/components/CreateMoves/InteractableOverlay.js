import React, { Component } from "react";
import { StyleSheet, Keyboard, Animated, View, Text, TextInput } from "react-native";

import Interactable from "react-native-interactable";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import SelectGroup from "./SelectGroup";
import BackButton from "../global/BackButton";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  TRANSITION_DURATION,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

class InteractableOverlay extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);
    this.state = {
      open: false,
      text: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
      // this.setState({ open: true });
    }, 5);
  }

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 0) {
      this.setState({ open: false }, () => Navigation.dismissOverlay(this.props.componentId));
    } else {
      this.setState({ open: true });
    }
  };

  render() {
    const closed = { y: SCREEN_HEIGHT, damping: 0.5, tension: 600 };
    const open = { y: SB_HEIGHT, damping: 0.5, tension: 600 };

    let opacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT, SCREEN_HEIGHT],
        outputRange: [1, 0]
      })
    };

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[FillAbsolute, opacity]}>
          <BlurView blurType="dark" blurAmount={10} style={FillAbsolute} />
        </Animated.View>
        <Interactable.View
          animatedNativeDriver
          ref={item => (this.interactable = item)}
          verticalOnly={true}
          snapPoints={[closed, open]}
          onSnap={this.handleOnSnap}
          initialPosition={closed}
          animatedValueY={this.deltaY}
        >
          <Text style={{ color: "white" }}>TEST</Text>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "300"
    // color: "white"
  }
});

export default InteractableOverlay;
