const activeBackground1 = "rgba(74,226,255,1)";
const activeBackground2 = "rgba(59,188,255,1)";

const laterBackground1 = "rgba(137,89,255,1)";
const laterBackground2 = "rgba(134,60,255,1)";

const whiteTrans = "rgba(255,255,255,0.8)";

// const primary = "#5AC8FA";
const primary = "#2b49ff";
const secondary = "#FF2C55";
const tertiary = "#5856d6";

const groups = "#FF9500";
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
  shadowRadius: 0.75,
  shadowOpacity: 0.1,
  shadowOffset: {
    height: 0,
    width: 0
  },
  shadowColor: "#000000"
};

const iconShadow = {
  shadowRadius: 20,
  shadowOpacity: 0.5,
  shadowOffset: {
    height: 0,
    width: 0
  },
  shadowColor: "#000000"
};

const lightShadow = {
  shadowRadius: 5,
  shadowOpacity: 0.15,
  shadowOffset: {
    height: -1,
    width: 0
  },
  shadowColor: "#000000"
};

const shadowBottom = {
  shadowRadius: 3,
  shadowOpacity: 0.1,
  shadowOffset: {
    height: 4,
    width: 0
  },
  shadowColor: "#000000"
};

const heavyShadow = {
  shadowRadius: 4,
  shadowOpacity: 0.25,
  shadowOffset: {
    height: 2,
    width: 0
  },
  shadowColor: "#000000"
};

const buttonShadow = {
  shadowRadius: 3,
  shadowOpacity: 0.15,
  shadowOffset: {
    height: -1,
    width: 0
  },
  shadowColor: "#000000"
};

const cardShadow = {
  shadowRadius: 30,
  shadowOpacity: 0.13,
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

const colors = {
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

module.exports = {
  Colors: colors,
  shadow,
  FillAbsolute,
  cardShadow,
  iconShadow,
  shadowBottom,
  lightShadow,
  heavyShadow,
  buttonShadow
};
