import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Button, Image, Text } from "react-native";
import PropTypes from "prop-types";

import Interactable from "react-native-interactable";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import SuperEllipseMask from "react-native-super-ellipse-mask";
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
  BORDER_RADIUS,
  TRANSITION_DURATION,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

const yOffset = new Animated.Value(0);
const xOffset = new Animated.Value(0);

class Focus extends Component {
  constructor(props) {
    super(props);
    const { height, width, x, y, pageX, pageY } = this.props.source;

    yOffset.addListener(() => {});
    this.deltaY = new Animated.Value(pageY);

    this.state = {
      open: false,
      joined: this.props.joined,
      sourceDimension: {
        height,
        width,
        x,
        y,
        pageX,
        pageY
      }
    };
  }

  componentDidMount() {
    this.beginTransition();
  }

  componentWillUnmount() {
    yOffset.removeAllListeners();
  }

  beginTransition = () => {
    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
    }, 5);
  };

  handleOnDrag = event => {
    const { state, x, y } = event.nativeEvent;
    if (state === "start") this.horizScrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
  };

  handleVertScrollRelease = event => {
    const { changedTouches, locationY, pageY } = event.nativeEvent;
    if (yOffset._value < -50) {
      this.horizScrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
      this.interactable.snapTo({ index: 0 });
    }
  };

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 0) {
      this.props.onReturn().then(() => {
        const moveId = this.props.data.id;
        if (this.state.joined && !this.props.joined) this.props.joinMove(moveId);
        else if (!this.state.joined && this.props.joined) this.props.leaveMove(moveId);
        this.props.returnScreen();
        Navigation.dismissOverlay(this.props.componentId);
      });
    } else {
      this.setState({ open: true });
    }
  };

  vertOnScroll = Animated.event([{ nativeEvent: { contentOffset: { y: yOffset } } }], {
    useNativeDriver: true
  });

  horizOnScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }], {
    useNativeDriver: true
  });

  handleOnPress = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.setState({ joined: !this.state.joined });
  };

  render() {
    const { height, width, x, y, pageX, pageY } = this.state.sourceDimension;

    const openOffset = SB_HEIGHT + CARD_GUTTER;
    const inputRange = openOffset < pageY ? [openOffset, pageY] : [pageY, openOffset];

    let opacity = {
      opacity: this.deltaY.interpolate({
        inputRange,
        outputRange: openOffset < pageY ? [1, 0] : [0, 1]
      })
    };

    let shadowOpacity = {
      opacity: yOffset.interpolate({
        inputRange: [0, 30],
        outputRange: [0, 1],
        extrapolate: "clamp"
      })
    };

    let focusContainerStyle = {
      ...FillAbsolute,
      top: 20,
      paddingTop: height - 20 + CARD_GUTTER,
      paddingHorizontal: CARD_GUTTER,
      transform: [
        {
          translateY: this.deltaY.interpolate({
            inputRange,
            outputRange:
              openOffset < pageY ? [SB_HEIGHT, SCREEN_HEIGHT] : [SCREEN_HEIGHT, SB_HEIGHT]
          })
        }
      ]
    };

    let animatedScroll = {
      transform: [
        {
          translateY: yOffset.interpolate({
            inputRange: [-SCREEN_HEIGHT, 0, 5],
            outputRange: [pageY, 0, 0]
          })
        }
      ]
    };

    let buttonAnimatedStyle = {
      transform: [
        {
          scale: xOffset.interpolate({
            inputRange: [0, SCREEN_WIDTH / 2],
            outputRange: [0, 1],
            extrapolate: "clamp"
          })
        }
      ]
    };

    let gradientContainerStyle = [
      {
        position: "absolute",
        top: SB_HEIGHT + height / 2,
        left: 0,
        right: 0,
        height: height / 2 + 15
      },
      shadowOpacity
    ];

    const Move = this.props.active ? (
      <ActiveMove
        onPressPresentOverlayTo={this.props.onPressPresentOverlayTo}
        move={this.props.data}
        coords={this.props.coords}
      />
    ) : (
      <LaterMove
        onPressPresentOverlayTo={this.props.onPressPresentOverlayTo}
        move={this.props.data}
        coords={this.props.coords}
      />
    );

    const FocusContent = this.props.active ? (
      <ActiveFocus
        handleOnPress={this.handleOnPress}
        joined={this.state.joined}
        open={this.state.open}
        userLocation={this.props.coords}
        moveLocation={this.props.data.location}
      />
    ) : (
      <LaterFocus
        handleOnPress={this.handleOnPress}
        joined={this.state.joined}
        open={this.state.open}
        userLocation={this.props.coords}
        moveLocation={this.props.data.location}
      />
    );

    return (
      <View style={styles.flex}>
        <Animated.View style={[FillAbsolute, opacity]}>
          <BlurView blurType="dark" blurAmount={10} style={FillAbsolute} />
        </Animated.View>

        <Animated.ScrollView
          ref={ScrollView => (this.vertScrollView = ScrollView)}
          onResponderRelease={this.handleVertScrollRelease}
          style={focusContainerStyle}
          onScroll={this.vertOnScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {FocusContent}
        </Animated.ScrollView>

        <Animated.View style={gradientContainerStyle}>
          <LinearGradient
            style={styles.flex}
            locations={[0.5, 1]}
            colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          />
        </Animated.View>

        <Interactable.View
          animatedNativeDriver
          verticalOnly
          ref={Interactable => (this.interactable = Interactable)}
          style={[styles.card, animatedScroll]}
          snapPoints={[
            { y: pageY, damping: 0.5, tension: 600 },
            { y: SB_HEIGHT + CARD_GUTTER, damping: 0.5, tension: 600 }
          ]}
          initialPosition={{ y: pageY }}
          animatedValueY={this.deltaY}
          onDrag={this.handleOnDrag}
          onSnap={this.handleOnSnap}
        >
          <Animated.ScrollView
            horizontal
            pagingEnabled
            ref={ScrollView => (this.horizScrollView = ScrollView)}
            showsHorizontalScrollIndicator={false}
            onScroll={this.horizOnScroll}
            scrollEventThrottle={16}
            style={styles.scroll}
          >
            <View shouldRasterizeIOS style={styles.moveContainer}>
              {Move}
            </View>
            <Animated.View style={buttonAnimatedStyle}>
              <SuperEllipseMask radius={BORDER_RADIUS}>
                <TouchableScale
                  style={[
                    styles.endMoveButton,
                    {
                      width: SCREEN_WIDTH / 2,
                      height: height,
                      paddingRight: CARD_GUTTER
                    }
                  ]}
                  onPress={() => console.log("yo")}
                >
                  <Text style={styles.text}>End Move</Text>
                </TouchableScale>
              </SuperEllipseMask>
            </Animated.View>
          </Animated.ScrollView>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  moveContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: CARD_GUTTER
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  scroll: {
    width: SCREEN_WIDTH
  },
  endMoveButton: {
    backgroundColor: Colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15
  },
  text: {
    color: "white",
    fontSize: 18
  },
  cover: {
    flex: 1,
    backgroundColor: Colors.lightGray
  }
});

export default Focus;
