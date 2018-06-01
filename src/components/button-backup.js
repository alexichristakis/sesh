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

		this.animatedOpacity = new Animated.Value(0);
		this.rotation = new Animated.Value(0);

		this.mainButtonScale = new Animated.Value(1);
		this.activeScale = new Animated.Value(1);
		this.laterScale = new Animated.Value(1);

		this.mainTranslate = new Animated.Value(0);
		this.activeTranslate = new Animated.Value(0);
		this.laterTranslate = new Animated.Value(0);
	}

	buttonExit = () => {
		if (this.state.open) this.handleCloseButton();

		Animated.parallel([
			Animated.timing(this.mainTranslate, {
				toValue: 120,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start(),
			Animated.timing(this.activeTranslate, {
				toValue: 120,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start(),
			Animated.timing(this.laterTranslate, {
				toValue: 120,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start()
		]);
	};

	buttonReturn = () => {
		Animated.parallel([
			Animated.timing(this.mainTranslate, {
				toValue: 0,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start(),
			Animated.timing(this.activeTranslate, {
				toValue: 0,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: true,
			}).start(),
			Animated.timing(this.laterTranslate, {
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
			Animated.timing(this.animatedOpacity, {
				toValue: 1,
				duration: 150,
				easing: Easing.ease
			}).start(),
			Animated.timing(this.activeTranslate, {
				toValue: -75,
				duration: 150,
				delay: 25,
				easing: Easing.ease
				// useNativeDriver: false,
			}).start(),
			Animated.timing(this.laterTranslate, {
				toValue: -140,
				duration: 150,
				easing: Easing.ease
				// useNativeDriver: false,
			}).start()
		]);
	};

	handleCloseButton = () => {
		this.setState({ open: false });
		// ReactNativeHapticFeedback.trigger("impactLight");

		Animated.parallel(
			[
				Animated.timing(this.rotation, {
					toValue: 0,
					duration: 400
					// useNativeDriver: false,
				}).start(),
				Animated.timing(this.animatedOpacity, {
					toValue: 0,
					duration: 150,
					easing: Easing.ease
				}).start(),
				Animated.timing(this.activeTranslate, {
					toValue: 0,
					duration: 150,
					easing: Easing.ease
					// useNativeDriver: false,
				}).start(),
				Animated.timing(this.laterTranslate, {
					toValue: 0,
					duration: 150,
					easing: Easing.ease
					// useNativeDriver: false,
				}).start()
			]
			// { useNativeDriver: true },
		);
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
					translateY: this.mainTranslate
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

		let activeAnimatedStyle = {
			opacity: this.animatedOpacity,
			transform: [
				{
					translateY: this.activeTranslate
				},
				{
					translateX: this.activeTranslate
				},
				{
					scale: this.activeScale
				}
			]
		};

		let laterAnimatedStyle = {
			opacity: this.animatedOpacity,
			transform: [
				{
					translateY: this.laterTranslate
				},
				{
					translateX: this.activeTranslate
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
				<Animated.View style={[styles.activeButton, activeAnimatedStyle]}>
					<TouchableWithoutFeedback
						onPressIn={() => this.handlePressIn(this.activeScale)}
						onPressOut={() => this.handlePressOut(this.activeScale)}
						onPress={() => this.haptic(presentModal("sesh.CreateActiveMove"))}
						style={styles.activeButton}
					>
						{/* <Icon name="send" size={25} color={"white"} /> */}
						<Icon name="plus" size={25} color={"white"} />
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
		bottom: SB_HEIGHT === 20 ? 40 : 60,
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
		width: 70,
		height: 70,
		borderRadius: 35,
		// backgroundColor: "transparent",
		backgroundColor: Colors.primary,
		overflow: "hidden"
		// borderRadius:
	},
	activeButton: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: "white",
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: Colors.active,
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
