import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";
// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SB_HEIGHT, SCREEN_WIDTH } from "../lib/constants";
import { Colors, shadow } from "../lib/styles";

class NewMoveButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		};

		this.rotation = new Animated.Value(0);
		this.xTranslate = new Animated.Value(0);
		this.yTranslate = new Animated.Value(0);
		this.mainExit = new Animated.Value(0);

		this.animatedOpacity = new Animated.Value(0);
		this.rotation = new Animated.Value(0);

		this.mainButtonScale = new Animated.Value(1);
		this.currentlyScale = new Animated.Value(1);
		this.laterScale = new Animated.Value(1);

		this.mainTranslate = new Animated.Value(0);
		this.currentlyTranslate = new Animated.Value(0);
		this.laterTranslate = new Animated.Value(0);
	}

	buttonExit = () => {
		if (this.state.open) this.handleCloseButton();

		Animated.parallel([
			Animated.timing(this.mainExit, {
				toValue: 1,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start(),
			Animated.timing(this.yTranslate, {
				toValue: -2,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start()
		]);
	};

	buttonReturn = () => {
		Animated.parallel([
			Animated.timing(this.mainExit, {
				toValue: 0,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start(),
			Animated.timing(this.yTranslate, {
				toValue: 0,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start()
		]);
	};

	handleOnPress = () => {
		if (this.state.open) {
			this.handleCloseButton();
		} else {
			this.handleOpenButton();
		}
	};

	handlePressIn = animatedValue => {
		Animated.spring(animatedValue, {
			toValue: 0.9
			// useNativeDriver: true,
		}).start();
	};

	handlePressOut = animatedValue => {
		Animated.spring(animatedValue, {
			toValue: 1,
			friction: 3,
			tension: 40
			// useNativeDriver: true,
		}).start();
	};

	handleOpenButton = () => {
		this.setState({ open: true });
		// ReactNativeHapticFeedback.trigger("impactLight");

		Animated.parallel([
			Animated.spring(this.rotation, {
				toValue: 1,
				friction: 5
				// duration: 400,
				// useNativeDriver: false,
			}).start(),
			Animated.timing(this.yTranslate, {
				toValue: 1,
				duration: 150,
				delay: 25,
				easing: Easing.ease
				// useNativeDriver: false,
			}).start(),
			Animated.timing(this.xTranslate, {
				toValue: 1,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: false,
			}).start()
		]);
	};

	handleCloseButton = () => {
		this.setState({ open: false });
		// ReactNativeHapticFeedback.trigger("impactLight");

		Animated.parallel([
			Animated.spring(this.rotation, {
				toValue: 0,
				friction: 5
				// duration: 400,
				// useNativeDriver: false,
			}).start(),
			Animated.timing(this.yTranslate, {
				toValue: 0,
				duration: 150,
				delay: 25,
				easing: Easing.ease
				// useNativeDriver: false,
			}).start(),
			Animated.timing(this.xTranslate, {
				toValue: 0,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: false,
			}).start()
		]);
	};

	haptic = func => {
		// ReactNativeHapticFeedback.trigger("impactLight");
		func;
	};

	render() {
		/* navigation functions */
		const presentModal = this.props.onPressPresentModalTo;

		let mainAnimatedStyle = {
			transform: [
				{
					translateY: this.mainExit.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 150]
					})
				},
				{
					rotateZ: this.rotation.interpolate({
						inputRange: [0, 1],
						outputRange: ["0deg", "45deg"]
					})
				},
				{
					scale: this.mainButtonScale
				}
			]
		};

		let currentlyAnimatedStyle = {
			// opacity: this.animatedOpacity,
			transform: [
				{
					translateY: this.yTranslate.interpolate({
						inputRange: [0, 1],
						outputRange: [0, -45]
					})
				},
				{
					translateX: this.xTranslate.interpolate({
						inputRange: [0, 1],
						outputRange: [0, -45]
					})
				},
				{
					scale: this.currentlyScale
				}
			]
		};

		let laterAnimatedStyle = {
			// opacity: this.animatedOpacity,
			transform: [
				{
					translateY: this.yTranslate.interpolate({
						inputRange: [0, 1],
						outputRange: [0, -45]
					})
				},
				{
					translateX: this.xTranslate.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 45]
					})
				},
				{
					scale: this.laterScale
				}
			]
		};

		return (
			<View style={styles.container}>
				<Animated.View style={[styles.laterButton, laterAnimatedStyle]}>
					<TouchableWithoutFeedback
						onPressIn={() => this.handlePressIn(this.laterScale)}
						onPressOut={() => this.handlePressOut(this.laterScale)}
						onPress={() => this.haptic(presentModal("sesh.CreateLaterMove"))}
						style={styles.laterButton}
					>
						<Icon name="clock" size={25} color={"white"} />
					</TouchableWithoutFeedback>
				</Animated.View>
				<Animated.View style={[styles.currentlyButton, currentlyAnimatedStyle]}>
					<TouchableWithoutFeedback
						onPressIn={() => this.handlePressIn(this.currentlyScale)}
						onPressOut={() => this.handlePressOut(this.currentlyScale)}
						onPress={() => this.haptic(presentModal("sesh.CreateCurrentMove"))}
						style={styles.currentlyButton}
					>
						{/* <Icon name="send" size={25} color={"white"} /> */}
						<Icon name="plus" size={20} color={"white"} />
					</TouchableWithoutFeedback>
				</Animated.View>

				<Animated.View style={[styles.mainButton, mainAnimatedStyle]}>
					<TouchableWithoutFeedback
						style={styles.mainButton}
						onPressIn={() => this.handlePressIn(this.mainButtonScale)}
						onPressOut={() => this.handlePressOut(this.mainButtonScale)}
						onPress={this.handleOnPress}
					>
						<Icon name="plus" size={50} color={"white"} />
					</TouchableWithoutFeedback>
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "red",
		bottom: SB_HEIGHT === 20 ? 35 : 55,
		left: SCREEN_WIDTH / 2,
		position: "absolute",
		alignItems: "center",
		justifyContent: "center"
		// ...shadow,
	},
	mainButton: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: Colors.lightGray,
		width: 60,
		height: 60,
		borderRadius: 30,
		// backgroundColor: "transparent",
		backgroundColor: Colors.primary,
		overflow: "hidden"
		// borderRadius:
	},
	currentlyButton: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: "white",
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: Colors.currently,
		// backgroundColor: "transparent",
		overflow: "hidden"
		// borderRadius:
	},
	laterButton: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: "white",
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: Colors.later,
		// backgroundColor: "transparent",
		overflow: "hidden"
		// borderRadius:
	}
});

export default NewMoveButton;
