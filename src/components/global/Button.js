import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback, Animated } from "react-native";

// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import PropTypes from "prop-types";
import LoadingCircle from "./LoadingCircle";
import Checkmark from "./Checkmark";
import { buttonShadow, Colors } from "~/lib/styles";

class Button extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: this.props.loading || false,
			checkmark: false
		};
	}

	componentWillMount() {
		this.animatedValue = new Animated.Value(1);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.loading });
	}

	handlePressIn = () => {
		// ReactNativeHapticFeedback.trigger("impactLight");
		Animated.spring(this.animatedValue, {
			toValue: 0.9
		}).start();
	};

	handlePressOut = () => {
		// ReactNativeHapticFeedback.trigger("impactLight");
		Animated.spring(this.animatedValue, {
			toValue: 1,
			friction: 3,
			tension: 40
		}).start();
	};

	render() {
		let animatedStyle = {
			transform: [{ scale: this.animatedValue }]
		};
		if (this.props.animate == false) {
			animatedStyle = {};
		}

		let primary = true;
		if (this.props.primary == false) {
			primary = false;
		}

		let small = false;
		if (this.props.small == true) {
			small = true;
		}

		let checkmark = false;
		if (this.props.checkmark == true) {
			checkmark = true;
		}

		let checkmarkPersist = true;
		if (this.props.checkmarkPersist == false) {
			checkmarkPersist = false;
		}

		return (
			<TouchableWithoutFeedback
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}
				disabled={this.state.loading}
				onPress={() => {
					// play checkmark animation onPress before action
					if (checkmark) {
						this.setState(prevState => {
							return {
								...prevState,
								checkmark: true
							};
						});
						if (checkmarkPersist) {
							setTimeout(() => {
								this.props.onPress();
								setTimeout(() => {
									this.setState(prevState => {
										return {
											...prevState,
											checkmark: false
										};
									});
								}, 500);
							}, 500);
						} else {
							setTimeout(() => {
								this.props.onPress();
								this.setState(prevState => {
									return {
										...prevState,
										checkmark: false
									};
								});
							}, 500);
						}
					} else {
						this.props.onPress();
					}
				}}
			>
				<Animated.View
					style={{
						...animatedStyle,
						...this.props.style,
						width: small ? 120 : 280,
						height: small ? 50 : 60,
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 10,
						// backgroundColor: this.props.style.color || Colors.blue,
						...buttonShadow
					}}
				>
					{!this.state.loading && this.state.checkmark && <Checkmark size={24} />}

					{this.state.loading && !this.state.checkmark && <LoadingCircle size={24} />}

					{!this.state.loading &&
						!this.state.checkmark && (
							<Text
								style={{
									fontSize: small ? 18 : 22,
									fontWeight: "600",
									textAlign: "center",
									color: Colors.lightGray
								}}
							>
								{this.props.title}
							</Text>
						)}
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

Button.propTypes = {
	// title: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	image: PropTypes.node,
	style: PropTypes.object,
	color: PropTypes.string,
	footer: PropTypes.bool,
	primary: PropTypes.bool,
	small: PropTypes.bool,
	animate: PropTypes.bool,
	checkmark: PropTypes.bool
};

export default Button;
