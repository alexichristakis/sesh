import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Button, Image, Text } from "react-native";
import PropTypes from "prop-types";

import Interactable from "react-native-interactable";
import LinearGradient from "react-native-linear-gradient";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import TouchableScale from "./TouchableScale";
import ActiveFocus from "../Active/ActiveFocus";
import ActiveMove from "../Active/ActiveMove";
import LaterFocus from "../Later/LaterFocus";
import LaterMove from "../Later/LaterMove";

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

  componentDidMount() {
    console.log(this.props);
    this.beginTransition();
    // this.beginTransition(this.props.source, this.props.onReturn, this.props.data, this.props.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.transitioning !== nextState.transitioning) return true;
    else return false;
  }

  // beginTransition = (source, onReturn, data, props) => {
  beginTransition = () => {
    const { height, width, x, y, pageX, pageY } = this.props.source;
    this.setState(
      {
        transitioning: true,
        sourceDimension: {
          height: height,
          width: width,
          x: x,
          y: y,
          pageX: pageX,
          pageY: pageY
        }
      },
      () => {
        setTimeout(() => {
          this.interactable.snapTo({ index: 1 });
          this.setState({ open: true });
        }, 5);
      }
    );
  };

  // handleOnDrag = event => {
  //   const { state, x, y } = event.nativeEvent;
  //   // this.setState({ transitioning: true });
  //   if (state === "end") {
  //     if (y > 75) {
  //       this.setState({ open: false, transitioning: true }, () => {
  //         this.interactable.snapTo({ index: 0 });
  //         this.props.returnScreen();
  //       });
  //     }
  //   }
  // };

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 0) {
      this.props.onReturn().then(() =>
        this.setState({ transitioning: false }, () => {
          this.props.returnScreen();
          Navigation.dismissOverlay(this.props.componentId);
        })
      );
    } else {
      this.setState({ transitioning: false });
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

    let shadowOpacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT + CARD_GUTTER, SB_HEIGHT + CARD_GUTTER + 2, pageY],
        outputRange: [1, 0, 0]
      })
    };

    let focusContainerStyle = {
      ...FillAbsolute,
      // paddingTop: height + CARD_GUTTER,
      transform: [
        {
          translateY: this.deltaY.interpolate({
            inputRange: [SB_HEIGHT + CARD_GUTTER, pageY],
            // outputRange: [height + SB_HEIGHT + CARD_GUTTER, SCREEN_HEIGHT]
            outputRange: [SB_HEIGHT, SCREEN_HEIGHT]
          })
        }
      ]
    };

    let focusStyle = {
      top: 20,
      paddingTop: height - 20 + CARD_GUTTER,
      paddingHorizontal: CARD_GUTTER
    };

    const Move = this.props.active ? (
      <ActiveMove
        onPressPresentOverlayTo={this.props.onPressPresentOverlayTo}
        move={this.props.data}
      />
    ) : (
      <LaterMove
        onPressPresentOverlayTo={this.props.onPressPresentOverlayTo}
        move={this.props.data}
      />
    );
    if (this.state.transitioning || this.state.open) {
      return (
        <View style={FillAbsolute}>
          <Animated.View style={[FillAbsolute, opacity]}>
            <BlurView blurType="dark" blurAmount={10} style={FillAbsolute} />
          </Animated.View>

          <Animated.View style={focusContainerStyle}>
            {this.props.active && (
              <ActiveFocus
                style={focusStyle}
                transitioning={this.state.transitioning}
                data={this.state.data}
                cardHeight={height}
              />
            )}
            {!this.props.active && (
              <LaterFocus
                style={focusStyle}
                transitioning={this.state.transitioning}
                data={this.state.data}
                cardHeight={height}
              />
            )}
          </Animated.View>

          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: SB_HEIGHT + height + 30
              },
              shadowOpacity
            ]}
          >
            <LinearGradient
              style={{ flex: 1 }}
              locations={[0.5, 1]}
              colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
            />
          </Animated.View>

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
            // onDrag={this.handleOnDrag}
            onSnap={this.handleOnSnap}
          >
            {Move}
          </Interactable.View>
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
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: CARD_GUTTER
  },
  cover: {
    flex: 1,
    backgroundColor: Colors.lightGray
  }
});

export default Transition;
