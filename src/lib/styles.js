const primary = "#007AFF";
const groups = "#FF9500";
const groupsTrans = "rgba(255, 149, 0, 0.5)";
const active = "#5AC8FA";
const later = "#FF2C55";

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
const mediumGray = "#EFEFEF";
const gray = "#979797";

const card = {};

const shadow = {
	shadowRadius: 0.75,
	shadowOpacity: 0.1,
	shadowOffset: {
		height: 0,
		width: 0,
	},
	shadowColor: "#000000",
};

const iconShadow = {
	shadowRadius: 20,
	shadowOpacity: 0.5,
	shadowOffset: {
		height: 0,
		width: 0,
	},
	shadowColor: "#000000",
};

const lightShadow = {
	shadowRadius: 5,
	shadowOpacity: 0.15,
	shadowOffset: {
		height: -1,
		width: 0,
	},
	shadowColor: "#000000",
};

const shadowBottom = {
	shadowRadius: 3,
	shadowOpacity: 0.1,
	shadowOffset: {
		height: 4,
		width: 0,
	},
	shadowColor: "#000000",
};

const heavyShadow = {
	shadowRadius: 4,
	shadowOpacity: 0.1,
	shadowOffset: {
		height: 2,
		width: 0,
	},
	shadowColor: "#000000",
};

const buttonShadow = {
	shadowRadius: 3,
	shadowOpacity: 0.15,
	shadowOffset: {
		height: -1,
		width: 0,
	},
	shadowColor: "#000000",
};

const cardShadow = {
	shadowRadius: 30,
	shadowOpacity: 0.13,
	shadowOffset: {
		height: 0,
		width: 0,
	},
	shadowColor: "#000000",
};

const colors = {
	primary,
	groups,
	groupsTrans,
	active,
	later,
	lightGray,
	mediumGray,
	gray,
	red,
};

module.exports = {
	Colors: colors,
	shadow: shadow,
	cardShadow,
	iconShadow,
	shadowBottom,
	lightShadow,
	heavyShadow,
	buttonShadow,
};
