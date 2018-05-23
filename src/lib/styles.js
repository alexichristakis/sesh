const primary = "#007AFF";
const groups = "#FF9500";
const currently = "#5AC8FA";
const later = "#FF2C55";

const red = "#ff3b30";

const lightGray = "#F6F6F6";
const mediumGray = "#EFEFEF";
const gray = "#979797";

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

const colors = {
	primary,
	groups,
	currently,
	later,
	lightGray,
	mediumGray,
	gray,
	red,
};

module.exports = {
	Colors: colors,
	shadow: shadow,
	iconShadow,
	shadowBottom,
	lightShadow,
	heavyShadow,
	buttonShadow,
};
