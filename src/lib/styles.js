import { StyleSheet } from "react-native";

import { CARD_GUTTER, SCREEN_WIDTH } from "./constants";

// const activeBackground1 = "rgba(74,226,255,1)";
const activeBackground1 = "rgba(55,223,255,1)";
const activeBackground2 = "rgba(59,188,255,1)";

// const laterBackground1 = "rgba(137,89,255,1)";
const laterBackground1 = "rgba(172,65,255,1)";
const laterBackground2 = "rgba(134,60,255,1)";

const whiteTrans = "rgba(255,255,255,0.8)";

// const primary = "#5AC8FA";
const primary = "#2b49ff";
const secondary = "#FF2C55";
const tertiary = "#5856d6";

// const groups = "#FF9500";
const groups = "rgba(255,124,0,1)";
const groupsHeader1 = "#FFBB5C";
const groupsHeader2 = "#FF9500";
// const active = "#5856d6";
// const active = "#9121D3";
const active = "rgba(23,184,255,1)";
// const later = "#FF9500";
const later = "rgba(130,0,220,1)";

/* Apple colors */
const red = "#FF3B30";
const orange = "#FF9500";
const yellow = "#FFCC00";
const green = "#4CD964";
const tealBlue = "#5AC8FA";
const blue = "#007AFF";
const purple = "#5856d6";
const pink = "#FF2C55";

const lightGray = "#F6F6F6";
// const mediumGray = "#EFEFEF";
// const darkerGray = "rgb(209,211,212)";
const mediumGray = "rgb(212,214,216)";
const gray = "#979797";

const shadow = {
  shadowRadius: 10,
  shadowOpacity: 0.25,
  shadowOffset: {
    height: 0,
    width: 0
  },
  shadowColor: "#000000"
};

const FillAbsolute = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

const CardMargins = {
  marginHorizontal: CARD_GUTTER,
  marginBottom: CARD_GUTTER
};

const Colors = {
  whiteTrans,
  activeBackground1,
  activeBackground2,
  laterBackground1,
  laterBackground2,
  primary,
  secondary,
  tertiary,
  active,
  later,
  groups,
  groupsHeader1,
  groupsHeader2,
  lightGray,
  mediumGray,
  // darkerGray,
  blue,
  gray,
  red,
  green
};

const SeparatorStyles = StyleSheet.create({
  groups: {
    width: SCREEN_WIDTH - 15,
    marginLeft: 15,
    height: 1,
    backgroundColor: Colors.lightGray
  },
  users: {
    width: SCREEN_WIDTH - 24.5,
    marginLeft: 24.5,
    height: 1,
    backgroundColor: Colors.lightGray
  }
});

const TextStyles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "300"
  },
  headerWhite: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
    paddingTop: 10,
    paddingLeft: 10
  },
  body: {
    fontSize: 16,
    fontWeight: "400"
  },
  bold: {
    fontSize: 16,
    fontWeight: "500"
  },
  gray: {
    fontSize: 14,
    color: Colors.gray
  }
});

module.exports = {
  Colors,
  TextStyles,
  SeparatorStyles,
  shadow,
  FillAbsolute
};
