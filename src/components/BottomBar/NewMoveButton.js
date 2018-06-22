import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import TouchableScale from "../global/TouchableScale";

import { SB_HEIGHT, SCREEN_WIDTH } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

class NewMoveButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.rotation = new Animated.Value(0);
    this.xTranslate = new Animated.Value(0);
    this.yTranslate = new Animated.Value(0);

    this.mainButtonScale = new Animated.Value(1);
    this.activeScale = new Animated.Value(1);
    this.laterScale = new Animated.Value(1);
  }

  handleOnPress = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    if (this.state.open) {
      this.handleCloseButton();
    } else {
      this.handleOpenButton();
    }
  };

  handleOpenButton = () => {
    this.setState({ open: true });
    Animated.parallel([
      Animated.spring(this.rotation, {
        toValue: 1,
        friction: 5
        // duration: 400,
        // useNativeDriver: false,
      }),
      Animated.timing(this.yTranslate, {
        toValue: 1,
        duration: 150,
        delay: 25,
        easing: Easing.ease
        // useNativeDriver: false,
      }),
      Animated.timing(this.xTranslate, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease
        // useNativeDriver: false,
      })
    ]).start();
  };

  handleCloseButton = () => {
    this.setState({ open: false });
    Animated.parallel([
      Animated.spring(this.rotation, {
        toValue: 0,
        friction: 5
        // duration: 400,
        // useNativeDriver: false,
      }),
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 150,
        delay: 25,
        easing: Easing.ease
        // useNativeDriver: false,
      }),
      Animated.timing(this.xTranslate, {
        toValue: 0,
        duration: 150,
        easing: Easing.ease
        // useNativeDriver: false,
      })
    ]).start();
  };

  haptic = func => {
    ReactNativeHapticFeedback.trigger("impactLight");
    func;
  };

  render() {
    /* navigation functions */
    const presentModal = this.props.onPressPresentModalTo;

    let mainAnimatedStyle = {
      position: "absolute",
      transform: [
        {
          rotateZ: this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
          })
        }
      ]
    };

    let activeAnimatedStyle = {
      position: "absolute",
      transform: [
        {
          translateY: this.yTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -45]
          })
        },
        {
          translateX: this.xTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -45]
          })
        }
      ]
    };

    let laterAnimatedStyle = {
      position: "absolute",
      transform: [
        {
          translateY: this.yTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -45]
          })
        },
        {
          translateX: this.xTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 45]
          })
        }
        // {
        // 	scale: this.laterScale,
        // },
      ]
    };

    return (
      <View style={styles.container}>
        <Animated.View style={laterAnimatedStyle}>
          <TouchableScale
            style={[styles.subButton, { backgroundColor: Colors.later }]}
            animated={laterAnimatedStyle}
            onPress={() => this.haptic(presentModal("sesh.CreateLaterMove"))}
          >
            <Icon name="clock" size={25} color={"white"} />
          </TouchableScale>
        </Animated.View>
        <Animated.View style={activeAnimatedStyle}>
          <TouchableScale
            style={[styles.subButton, { backgroundColor: Colors.active }]}
            animated={activeAnimatedStyle}
            onPress={() => this.haptic(presentModal("sesh.CreateActiveMove"))}
          >
            <Icon name="plus" size={30} color={"white"} />
          </TouchableScale>
        </Animated.View>

        <Animated.View style={mainAnimatedStyle}>
          <TouchableScale
            style={styles.mainButton}
            animated={mainAnimatedStyle}
            onPress={this.handleOnPress}
          >
            <Icon name="plus" size={50} color={"white"} />
          </TouchableScale>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    bottom: SB_HEIGHT === 20 ? 35 : 55,
    left: SCREEN_WIDTH / 2,
    position: "absolute"
  },
  mainButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    overflow: "hidden"
  },
  subButton: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden"
  }
});

export default NewMoveButton;
