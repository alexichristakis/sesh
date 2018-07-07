import { Dimensions, Platform } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const SB_HEIGHT = Platform.OS === "ios" && SCREEN_HEIGHT === 812 ? 40 : 20;
const IS_X = SB_HEIGHT === 40;

const TRANSITION_DURATION = 200;

const CARD_GUTTER = 4;

const BORDER_RADIUS = 15;

module.exports = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  IS_X,
  TRANSITION_DURATION,
  CARD_GUTTER,
  BORDER_RADIUS
};
