import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, TouchableOpacity } from "react-native";

import merge from "deepmerge";

class TouchableScale extends Component {
	constructor(props) {
		super(props);

		this.animated = new Animated.Value(1);
	}

	handlePressIn = () => {
		Animated.spring(this.animated, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	handlePressOut = () => {
		Animated.spring(this.animated, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	render() {
		let containerAnimatedStyle = {
			transform: [
				{
					scale: this.animated,
				},
			],
		};

		return (
			<Animated.View style={containerAnimatedStyle}>
				<TouchableOpacity
					style={this.props.style}
					activeOpacity={1}
					onPressIn={this.handlePressIn}
					onPressOut={this.handlePressOut}
					onPress={this.props.onPress}>
					{this.props.children}
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

TouchableScale.propTypes = {
	onPress: PropTypes.func.isRequired,
};

export default TouchableScale;
