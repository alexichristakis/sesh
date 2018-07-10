import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const SB_HEIGHT = Platform.OS === "ios" && height === 812 ? 40 : 20;
const IS_X = SB_HEIGHT === 40;

const TRANSITION_DURATION = 200;

const CARD_GUTTER = 5;

const BORDER_RADIUS = 12;

const REFRESH_OFFSET = -125;

module.exports = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  SB_HEIGHT,
  IS_X,
  TRANSITION_DURATION,
  CARD_GUTTER,
  BORDER_RADIUS,
  REFRESH_OFFSET
};
