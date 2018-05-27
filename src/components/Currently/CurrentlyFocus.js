import React, { Component } from "react";
import { StyleSheet, Animated, View, TouchableOpacity, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { Colors, shadow } from "../../lib/styles";

import Focus from "../global/Focus";
import User from "../global/User";
import CurrentMove from "./CurrentMove";

const data = [];

class CurrentlyFocus extends Component {
	constructor(props) {
		super(props);

		this.animated = new Animated.Value(1);

		this.state = {
			joined: this.props.joined
		};
	}

	onPressPop = () => {
		if (this.state.joined) this.props.joinMove(this.props.data.id);
		else this.props.leaveMove(this.props.data.id);

		this.focus.exit();
		setTimeout(() => {
			Navigation.pop(this.props.componentId, {
				customTransition: {
					animations: [],
					duration: 0
				}
			});
			this.props.closeCard();
		}, 20);
	};

	handlePressIn = () => {
		Animated.spring(this.animated, {
			toValue: 0.9,
			useNativeDriver: true
		}).start();
	};

	handlePressOut = () => {
		Animated.spring(this.animated, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true
		}).start();
	};

	handleOnPress = () => {
		ReactNativeHapticFeedback.trigger("impactLight");
		this.setState({ joined: !this.state.joined });
	};

	_renderItem = ({ item }) => <User data={item} />;

	_renderHeader = () => {
		let animatedStyle = {
			transform: [
				{
					scale: this.animated
				}
			]
		};
		return (
			<Animated.View style={animatedStyle}>
				<TouchableOpacity
					activeOpacity={1}
					style={[
						styles.joinButton,
						{ backgroundColor: !this.state.joined ? "white" : Colors.currently }
					]}
					onPressIn={this.handlePressIn}
					onPressOut={this.handlePressOut}
					onPress={this.handleOnPress}
				>
					<Text
						style={[styles.joinText, { color: this.state.joined ? "white" : Colors.currently }]}
					>
						{!this.state.joined ? "Join" : "Leave"}
					</Text>
				</TouchableOpacity>
			</Animated.View>
		);
	};

	render() {
		return (
			<Focus
				ref={item => (this.focus = item)}
				data={data}
				renderHeader={this._renderHeader}
				optionButton={"ended"}
				cardHeight={this.props.cardHeight}
				statusBarHeight={this.props.statusBarHeight}
				closeCard={this.props.closeCard}
				onPressPop={this.onPressPop}
				renderItem={this._renderItem}
			>
				<CurrentMove move={this.props.data} />
			</Focus>
		);
	}
}

const styles = StyleSheet.create({
	joinButton: {
		margin: 10,
		padding: 15,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "white",
		...shadow
	},
	joinText: {
		// color: Colors.currently,
		fontSize: 18
	}
});

export default CurrentlyFocus;
