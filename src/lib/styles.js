const activeHeader1 = "rgba(23,184,255,1)";
const activeHeader2 = "rgba(0,147,255,0.8)";

const laterHeader1 = "rgba(163,90,240,1)";
const laterHeader2 = "rgba(130,0,220,0.8)";

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
  shadowOpacity: 0.1,
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

const colors = {
  whiteTrans,
  activeHeader1,
  activeHeader2,
  laterHeader1,
  laterHeader2,
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
  gray,
  red,
  green
};

module.exports = {
  Colors: colors,
  shadow: shadow,
  cardShadow,
  iconShadow,
  shadowBottom,
  lightShadow,
  heavyShadow,
  buttonShadow
};
