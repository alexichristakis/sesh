import React, { Component } from "react";
import { StyleSheet, Animated, Easing, View, Text, TouchableOpacity } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SCREEN_HEIGHT, SCREEN_WIDTH, SB_HEIGHT } from "../../lib/constants";
import { Colors } from "../../lib/styles";

const BAR_HEIGHT = 50;

class NavBar extends Component {
	constructor(props) {
		super(props);

		this.animated = new Animated.Value(0);
	}

	haptic = func => {
		// ReactNativeHapticFeedback.trigger("impactLight");
		func;
	};

	render() {
		const textColorTransform = this.props.textColorTransform;
		const indicatorAnimate = this.props.indicatorAnimate;
		const { scrollToStart, scrollToEnd } = this.props;

		return (
			<View style={styles.container}>
				<BlurView style={styles.blur} blurType={"xlight"}>
					<View style={styles.textContainer}>
						<TouchableOpacity style={styles.button} onPress={() => this.haptic(scrollToStart())}>
							<Animated.Text style={[styles.text, textColorTransform(0)]}>Now</Animated.Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => this.haptic(scrollToEnd())}>
							<Animated.Text style={[styles.text, textColorTransform(1)]}>Later</Animated.Text>
						</TouchableOpacity>
					</View>
					<Animated.View style={[styles.indicator, indicatorAnimate()]} />
				</BlurView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: SB_HEIGHT + 15,
		// // borderRadius: 15,
		// // borderTopLeftRadius: 100,
		// left: 0,
		// right: 0,
		// bottom: 0,
		// paddingBottom: 20,
		// paddingTop: 5,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		// backgroundColor: "red",
		overflow: "hidden",
	},
	blur: {
		// flex: 1
		position: "absolute",
		// // borderRadius: 15,
		// // borderTopLeftRadius: 100,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		paddingTop: 5,
		paddingBottom: SB_HEIGHT === 20 ? 5 : 25,
		// backgroundColor: "blue"
		// paddingBottom: 20
		// paddingTop: 100
	},
	button: {
		flex: 1,
	},
	textContainer: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
		flexDirection: "row",
		// position: "absolute"
		// padding: 20,
		// top: 60,
		// left: 0,
		// right: 0,
	},
	text: {
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
		textAlignVertical: "center",
		textAlign: "center",
		// paddingBottom: 10,
	},
	indicator: {
		// top: 22,
		// top: 0,
		height: 3,
		alignSelf: "center",
		borderRadius: 2,
	},
});

export default NavBar;