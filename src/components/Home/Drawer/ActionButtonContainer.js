import React from "react";
import { StyleSheet, Animated, View } from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import TouchableScale from "../../global/TouchableScale";

import { TransparentModalTo, GenerateMarkers } from "../../../lib/functions";
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
const ICON_SIZE = 60;

const ActionButtonContainer = props => {
  const { groups, open, toggleDrawer, deltaY } = props;

  presentNewActiveMove = () => {
    TransparentModalTo("sesh.CreateMove", {
      active: true,
      groups: groups
    });
  };

  presentNewLaterMove = () => {
    TransparentModalTo("sesh.CreateMove", {
      active: false,
      groups: groups
    });
  };

  let animatedScale = {
    transform: [
      {
        scale: deltaY.interpolate({
          inputRange: [0, SCREEN_HEIGHT / 2, (3 * SCREEN_HEIGHT) / 4, SCREEN_HEIGHT],
          outputRange: [0, 0.8, 1, 1],
          extrapolate: "clamp"
        })
      }
    ]
  };

  let animatedOpacity = {
    opacity: deltaY.interpolate({
      inputRange: [0, SB_HEIGHT, SCREEN_HEIGHT],
      outputRange: [0, 1, 1],
      extrapolate: "clamp"
    })
  };

  return (
    <View style={styles.actionButtonContainer}>
      <TouchableScale disabled={open} onPress={presentNewActiveMove}>
        <Animated.View style={[animatedScale, styles.button]}>
          <AwesomeIcon name={"bolt"} size={30} color={Colors.darkerGray} />
          {/* <FeatherIcon
            style={styles.plus}
            name={"plus"}
            size={14}
            color={Colors.darkerGray}
          /> */}
        </Animated.View>
      </TouchableScale>
      <TouchableScale onPress={toggleDrawer}>
        <Animated.View style={[animatedOpacity, styles.mainButton]}>
          <FeatherIcon name={"navigation"} size={30} color={Colors.darkerGray} />
        </Animated.View>
      </TouchableScale>
      <TouchableScale disabled={open} onPress={presentNewLaterMove}>
        <Animated.View style={[animatedScale, styles.button]}>
          <IonIcon name={"ios-time"} size={30} color={Colors.darkerGray} />
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
  mainButton: {
    flexDirection: "row",
    height: BUTTON_SIZE + 20,
    width: BUTTON_SIZE + 20,
    borderRadius: BUTTON_SIZE / 2 + 10,
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
