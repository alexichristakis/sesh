// // const lightGray = "#F9F9F9";
// const lightGray = "#F6F6F6";
// const lightGrayTrans = "rgba(216,216,216,0.7)";
// const mediumGray = "#EFEFEF";
// const gray = "#979797";
// const darkText = "#515151";
// const lightText = "#F4F4F4";
// const grayText = "#D2D2D2";
// const purple = "#896ABF";
// const blue = "#1977E5";
// const lightBlue = "#BAD7DE";
// const grayBlue = "#8B9DC3";
// const orange = "#F5A623";
// const red = "#F53F23";
// const green = "#7ED321";

const primary = "#007AFF";
const groups = "#FF9500";
const currently = "#5AC8FA";
const later = "#FF2C55";

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
	shadowRadius: 10,
	shadowOpacity: 0.4,
	shadowOffset: {
		height: 4,
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
	// primary: primary,
	// secondary: secondary,
	// tertiary: tertiary,
	// lightGray: lightGray,
	// lightGrayTrans: lightGrayTrans,
	// mediumGray: mediumGray,
	// gray: gray,
	// green: green,
	// darkText: darkText,
	// lightText: lightText,
	// grayText: grayText,
	// purple: purple,
	// blue: blue,
	// grayBlue: grayBlue,
	// lightBlue: lightBlue,
	// orange: orange,
	// red: red,
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
