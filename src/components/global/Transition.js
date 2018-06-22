import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Button, Image, Text } from "react-native";
import PropTypes from "prop-types";

import Interactable from "react-native-interactable";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import ActiveFocus from "../Active/ActiveFocus";
import TouchableScale from "./TouchableScale";
import Background from "./Background";
import ActiveMove from "../Active/ActiveMove";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  TRANSITION_DURATION,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

class Transition extends Component {
  constructor(props) {
    super(props);

    this.openProgress = new Animated.Value(0);
    this.deltaY = new Animated.Value(SCREEN_HEIGHT);

    this.state = {
      transitioning: false,
      open: false,
      MoveComponent: null,
      onReturn: null,
      sourceDimension: {
        height: 0,
        width: 0,
        pageX: 0,
        pageY: SCREEN_HEIGHT
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
    this.setState(
      {
        MoveComponent: MoveComponent,
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

    // this.interactable.changePosition({ x: 0, y: SB_HEIGHT + CARD_GUTTER });
    // this.props.clearScreen();
    // const pageY = this.state.pageY;
    // console.log(pageY);
    // console.log("openProgress: ", this.openProgress._value);
    // Animated.timing(this.openProgress, {
    //   toValue: 1,
    //   duration: TRANSITION_DURATION,
    //   easing: Easing.in(Easing.quad),
    //   useNativeDriver: true
    // }).start(() => this.setState({ transitioning: false, open: true }));
    // () => {
    // this.props.onPressPushTo(this.props.destinationPage, {
    //   ...props,
    //   cardHeight: this.state.sourceDimension.height,
    //   data: data,
    //   closeCard: this.closeCard
    // });
    // this.setState({ open: false });
    // }
    // ();
  };

  // closeCard = () => {
  //   this.setState({ open: false, transitioning: true });
  //   this.props.returnScreen();
  //   setTimeout(() => {
  //     this.state.onReturn();
  //   }, TRANSITION_DURATION - 5);
  //   Animated.timing(this.openProgress, {
  //     toValue: 0,
  //     duration: TRANSITION_DURATION,
  //     easing: Easing.out(Easing.quad),
  //     useNativeDriver: true
  //   }).start(() => {
  //     // this.openProgress = new Animated.Value(0);
  //     this.setState({ transitioning: false });
  //   });
  // };

  handleOnDrag = event => {
    const { state, x, y } = event.nativeEvent;
    if (state === "end") {
      if (y > 100) {
        this.setState({ open: false, transitioning: true }, () => {
          this.interactable.snapTo({ index: 0 });
          this.props.returnScreen();
        });

        // setTimeout(() => {
        //   this.state.onReturn();
        //   this.setState({ transitioning: false });
        // }, TRANSITION_DURATION - 5);
        // this.closeCard();
        //     // console.log(this.deltaY._value / this.state.sourceDimension.pageY);
        //     const pageY = this.state.sourceDimension.pageY;
        //     // this.interactable.changePosition({ x: 0, y: y });
        //     const dest = 1 - y / pageY;
        //
        //     // dest = 0;
        //     // console.log("dest: ", dest);
        //     Animated.timing(this.openProgress, {
        //       toValue: dest,
        //       duration: 0,
        //       useNativeDriver: true
        //     }).start(() => this.closeCard());
        //
        //     // this.openProgress = new Animated.Value(
        //     //   1 - this.deltaY._value / this.state.sourceDimension.pageY
        //     // );
        //     // this.closeCard();
      }
    }
    // console.log("state: ", state);
    // console.log("x: ", x);
    // console.log("y: ", y);
    // console.log("deltaY: ", this.deltaY._value);
  };

  handleClose = event => {
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
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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
        <View style={styles.container}>
          <Animated.View style={[styles.background, opacity]}>
            <BlurView blurType="dark" blurAmount={10} style={styles.background} />
          </Animated.View>
          <View style={{ flex: 1 }}>
            <Interactable.View
              animatedNativeDriver
              ref={item => (this.interactable = item)}
              style={styles.card}
              verticalOnly={true}
              snapPoints={[{ y: pageY }, { y: SB_HEIGHT + CARD_GUTTER }]}
              initialPosition={{ y: pageY }}
              animatedValueY={this.deltaY}
              onDrag={this.handleOnDrag}
              onSnap={this.handleClose}
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

          {/* <Animated.View style={cardAnimatedStyle}>
            <Interactable.View
              animatedNativeDriver
              ref={item => (this.interactable = item)}
              verticalOnly={true}
              // snapPoints={[{ x: 0, y: 0 }, { x: 0, y: pageY - height / 2 + 2.5 * CARD_GUTTER }]}
              snapPoints={[{ y: 0 }]}
              initialPosition={{ x: 0, y: 0 }}
              animatedValueY={this.deltaY}
              onDrag={this.handleOnDrag}
            >
              {Move}
            </Interactable.View>
            <ActiveFocus
              data={this.state.data}
              closeCard={this.closeCard}
              cardHeight={this.state.sourceDimension.height}
            />
          </Animated.View> */}
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
    right: 0
  },
  card: {
    position: "absolute",
    left: CARD_GUTTER,
    right: CARD_GUTTER
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
    // backgroundColor: Colors.mediumGray
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
//
