import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

console.log(width, height);

const SB_HEIGHT = Platform.OS === "ios" && (height === 812 || height === 896) ? 40 : 20;
const IS_X = SB_HEIGHT === 40;

const DRAWER_HEIGHT = IS_X ? 130 : 110;

const TRANSITION_DURATION = 200;

const CARD_GUTTER = 4;

const BORDER_RADIUS = 12;

const REFRESH_OFFSET = -150;

const LOADING = "loading";

module.exports = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  SB_HEIGHT,
  DRAWER_HEIGHT,
  IS_X,
  TRANSITION_DURATION,
  CARD_GUTTER,
  BORDER_RADIUS,
  REFRESH_OFFSET,
  LOADING
};
