import React from "react";
import { StyleSheet, Animated, View } from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import AwesomeIcon from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import TouchableScale from "../../global/TouchableScale";

import { ShowCreateActiveMove, ShowCreateLaterMove } from "../../../lib/navigation";
import { Colors, FillAbsolute, shadow } from "../../../lib/styles";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  ANIMATION_DURATION,
  CARD_GUTTER,
  DRAWER_HEIGHT
} from "../../../lib/constants";

const BUTTON_SIZE = 40;
const MAIN_BUTTON_SIZE = 65;
const ICON_SIZE = 60;

const ActionButtonContainer = ({ groups, user, open, toggleDrawer, deltaY }) => {
  let secondary = {
    opacity: deltaY.interpolate({
      inputRange: [0, SCREEN_HEIGHT / 2, 0.75 * SCREEN_HEIGHT, SCREEN_HEIGHT],
      outputRange: [0, 0.8, 1, 1],
      extrapolate: "clamp"
    }),
    transform: [
      {
        scale: deltaY.interpolate({
          inputRange: [0, SCREEN_HEIGHT / 2, 0.75 * SCREEN_HEIGHT, SCREEN_HEIGHT],
          outputRange: [0, 0.8, 1, 1],
          extrapolate: "clamp"
        })
      }
    ]
  };

  let primary = {
    opacity: deltaY.interpolate({
      inputRange: [0, SB_HEIGHT, SCREEN_HEIGHT],
      outputRange: [0, 1, 1],
      extrapolate: "clamp"
    }),
    transform: [
      {
        scale: deltaY.interpolate({
          inputRange: [0, SCREEN_HEIGHT / 2, SCREEN_HEIGHT],
          outputRange: [0, 1, 1],
          extrapolate: "clamp"
        })
      }
    ]
  };

  return (
    <View style={styles.actionButtonContainer}>
      <TouchableScale disabled={open} onPress={ShowCreateActiveMove}>
        <Animated.View style={[secondary, styles.button]}>
          <AwesomeIcon name={"bolt"} size={30} color={Colors.darkerGray} />
          {/* <FeatherIcon name={'zap'} size={30} color={Colors.darkerGray} /> */}
          {/* <FeatherIcon
            style={styles.plus}
            name={"plus"}
            size={14}
            color={Colors.darkerGray}
          /> */}
        </Animated.View>
      </TouchableScale>
      <TouchableScale onPress={toggleDrawer}>
        <Animated.View style={[primary, styles.mainButton]}>
          <FeatherIcon name={"navigation"} size={35} color={Colors.darkerGray} />
        </Animated.View>
      </TouchableScale>
      <TouchableScale disabled={open} onPress={ShowCreateLaterMove}>
        <Animated.View style={[secondary, styles.button]}>
          <IonIcon name={"ios-time"} size={30} color={Colors.darkerGray} />
          {/* <IonIcon name={"ios-time-outline"} size={30} color={Colors.darkerGray} /> */}
          {/* <FeatherIcon
            style={styles.plus}
            name={"plus"}
            size={14}
            color={Colors.darkerGray}
          /> */}
        </Animated.View>
      </TouchableScale>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    // justifyContent: "space-evenly",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: SCREEN_WIDTH,
    height: DRAWER_HEIGHT - 10,
    paddingTop: SB_HEIGHT === 20 ? 10 : 0
  },
  plus: {
    alignSelf: "flex-start",
    paddingTop: 10
  },
  mainButton: {
    flexDirection: "row",
    height: MAIN_BUTTON_SIZE,
    width: MAIN_BUTTON_SIZE,
    borderRadius: MAIN_BUTTON_SIZE / 2,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    ...shadow
  },
  button: {
    flexDirection: "row",
    height: BUTTON_SIZE + 10,
    width: BUTTON_SIZE + 10,
    borderRadius: BUTTON_SIZE / 2 + 5,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    ...shadow
  }
});

export default ActionButtonContainer;
