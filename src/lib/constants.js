import { Dimensions, Platform } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const SB_HEIGHT = Platform.OS === "ios" && SCREEN_HEIGHT === 812 ? 40 : 20;

const TRANSITION_DURATION = 250;

module.exports = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  TRANSITION_DURATION
};
