import React, { Component } from "react";
import { Animated, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Icon from "react-native-vector-icons/Feather";
import { BlurView } from "react-native-blur";

import { Colors, shadow } from "../../lib/styles";

class BackButton extends Component {
	componentWillMount() {
		this.animatedValue = new Animated.Value(1);
	}

	handlePressIn = () => {
		Animated.spring(this.animatedValue, {
			toValue: 0.9,
			useNativeDriver: true
		}).start();
	};

	handlePressOut = () => {
		Animated.spring(this.animatedValue, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true
		}).start();
	};

	haptic = func => {
		ReactNativeHapticFeedback.trigger("impactLight");
		func;
	};

	render() {
		let animatedStyle = {
			transform: [{ scale: this.animatedValue }]
		};

		return (
			<KeyboardAvoidingView behavior="position" enabled style={styles.button}>
				<Animated.View style={animatedStyle}>
					<TouchableOpacity
						activeOpacity={1}
						onPressIn={this.handlePressIn}
						onPressOut={this.handlePressOut}
						onPress={() => this.haptic(this.props.onPressPop())}
					>
						<BlurView blurAmount={20} blurType="xlight" style={styles.blur}>
							<Icon name="chevron-down" size={28} color={Colors.primary} />
						</BlurView>
					</TouchableOpacity>
				</Animated.View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = {
	button: {
		position: "absolute",
		paddingBottom: 30,
		bottom: 10,
		alignSelf: "center",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
		...shadow
	},
	blur: {
		paddingHorizontal: 20,
		borderRadius: 15
	}
};

BackButton.propTypes = {
	onPressPop: PropTypes.func.isRequired
};

export default BackButton;
