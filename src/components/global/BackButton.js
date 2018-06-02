import React, { Component } from "react";
import { Animated, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Icon from "react-native-vector-icons/Feather";
import { BlurView } from "react-native-blur";

import TouchableScale from "./TouchableScale";

import { Colors, shadow } from "../../lib/styles";

class BackButton extends Component {
	haptic = func => {
		ReactNativeHapticFeedback.trigger("impactLight");
		func;
	};

	render() {
		return (
			<KeyboardAvoidingView behavior="position" enabled style={styles.button}>
				<TouchableScale onPress={() => this.haptic(this.props.onPressPop())}>
					<BlurView blurAmount={20} blurType="xlight" style={styles.blur}>
						<Icon name="chevron-down" size={28} color={Colors.primary} />
					</BlurView>
				</TouchableScale>
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
		// backgroundColor: "transparent",
		...shadow,
	},
	blur: {
		paddingHorizontal: 20,
		borderRadius: 15,
	},
};

BackButton.propTypes = {
	onPressPop: PropTypes.func.isRequired,
};

export default BackButton;
