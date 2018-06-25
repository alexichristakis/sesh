import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Button, Image, Text } from "react-native";
import PropTypes from "prop-types";

import Interactable from "react-native-interactable";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import ActiveFocus from "../Active/ActiveFocus";
import TouchableScale from "./TouchableScale";
// import Background from "./Background";
import ActiveMove from "../Active/ActiveMove";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  TRANSITION_DURATION,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

class Transition extends Component {
  constructor(props) {
    super(props);

    this.openProgress = new Animated.Value(0);
    this.deltaY = new Animated.Value(SCREEN_HEIGHT);

    this.state = {
      transitioning: false,
      open: false,
      onReturn: null,
      sourceDimension: {
        height: 0,
        width: 0,
        pageX: 0,
        pageY: SCREEN_HEIGHT
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.transitioning !== nextState.transitioning) return true;
    else return false;
  }

  beginTransition = (source, onReturn, data, props) => {
    this.setState(
      {
        transitioning: true,
        onReturn: onReturn,
        data: data,
        sourceDimension: {
          height: source.height,
          width: source.width,
          x: source.x,
          y: source.y,
          pageX: source.pageX,
          pageY: source.pageY
        }
      },
      () => this.openCard(source, onReturn, data, props)
    );
  };

  openCard = (source, onReturn, data, props) => {
    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
      this.setState({ transitioning: false, open: true });
    }, 5);
  };

  handleOnDrag = event => {
    const { state, x, y } = event.nativeEvent;
    if (state === "end") {
      if (y > 75) {
        this.setState({ open: false, transitioning: true }, () => {
          this.interactable.snapTo({ index: 0 });
          this.props.returnScreen();
        });
      }
    }
  };

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 0) {
      this.state.onReturn().then(() => this.setState({ transitioning: false }));
    }
  };

  render() {
    const { height, width, x, y, pageX, pageY } = this.state.sourceDimension;

    let opacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT + CARD_GUTTER, pageY],
        outputRange: [1, 0]
      })
    };

    let focusStyle = {
      ...FillAbsolute,
      transform: [
        {
          translateY: this.deltaY.interpolate({
            inputRange: [SB_HEIGHT + CARD_GUTTER, pageY],
            outputRange: [height + SB_HEIGHT + CARD_GUTTER, SCREEN_HEIGHT]
          })
        }
      ]
    };

    const Move = (
      <ActiveMove
        onPressPresentOverlayTo={this.props.onPressPresentOverlayTo}
        move={this.state.data}
      />
    );
    if (this.state.transitioning || this.state.open) {
      return (
        <View style={FillAbsolute}>
          <Animated.View style={[FillAbsolute, opacity]}>
            <BlurView blurType="dark" blurAmount={10} style={FillAbsolute} />
          </Animated.View>
          <View pointerEvents={this.state.transitioning ? "none" : "auto"} style={{ flex: 1 }}>
            <Interactable.View
              animatedNativeDriver
              ref={item => (this.interactable = item)}
              style={styles.card}
              verticalOnly={true}
              snapPoints={[
                { y: pageY, damping: 0.5, tension: 600 },
                { y: SB_HEIGHT + CARD_GUTTER, damping: 0.5, tension: 600 }
              ]}
              initialPosition={{ y: pageY }}
              animatedValueY={this.deltaY}
              onDrag={this.handleOnDrag}
              onSnap={this.handleOnSnap}
            >
              {Move}
            </Interactable.View>
            <Animated.View style={focusStyle}>
              <ActiveFocus
                data={this.state.data}
                closeCard={this.closeCard}
                cardHeight={this.state.sourceDimension.height}
              />
            </Animated.View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: CARD_GUTTER,
    right: CARD_GUTTER
  },
  cover: {
    flex: 1,
    backgroundColor: Colors.lightGray
  }
});

export default Transition;
