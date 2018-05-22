import React, { Component } from "react";
import {
	LayoutAnimation,
	Easing,
	Animated,
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

class CardWrapper extends Component {
	constructor(props) {
		super(props);

		this.animated = new Animated.Value(1);
		this.openProgress = new Animated.Value(0);
		this.state = {
			open: false,
			height: 0,
			width: 0,
			pageX: 0,
			pageY: 0,
			x: 0,
			y: 0,
		};
	}

	handlePressIn = () => {
		ReactNativeHapticFeedback.trigger("impactLight");
		Animated.spring(this.animated, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	handlePressOut = () => {
		setTimeout(() => {
			ReactNativeHapticFeedback.trigger("impactLight");
		}, 10);
		Animated.spring(this.animated, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	handleOnPress = (move, MoveComponent) => {
		this.view.getNode().measure((x, y, width, height, pageX, pageY) => {
			this.setState({ pageX: pageX, pageY: pageY });
			const dimensions = {
				height: this.state.height,
				width: this.state.width,
				x: this.state.x,
				y: this.state.y,
				pageX: this.state.pageX,
				pageY: this.state.pageY,
			};
			this.props.transitionFrom(dimensions, move, MoveComponent);
		});
	};

	measureCard = e => {
		this.setState({
			height: e.nativeEvent.layout.height,
			width: e.nativeEvent.layout.width,
			x: e.nativeEvent.layout.x,
			y: e.nativeEvent.layout.y,
		});
	};

	render() {
		let containerAnimatedStyle = {
			transform: [
				{
					scale: this.animated,
				},
			],
		};

		let Card = this.props.card;
		return (
			<Animated.View
				ref={item => (this.view = item)}
				onLayout={this.measureCard}
				style={[styles.container, containerAnimatedStyle]}>
				<TouchableOpacity
					activeOpacity={1}
					style={{ flex: 1 }}
					onPressIn={this.handlePressIn}
					onPressOut={this.handlePressOut}
					onPress={() => this.handleOnPress(this.props.data, Card)}>
					{Card}
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 15,
		marginHorizontal: 10,
		padding: 10,
		paddingRight: 12,
		marginBottom: 10,
		...shadow,
	},
});
//
// CardWrapper.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	group: PropTypes.string.isRequired,
// 	time: PropTypes.number.isRequired,
// 	description: PropTypes.string.isRequired,
// 	location: PropTypes.string.isRequired,
// 	photo: PropTypes.string.isRequired,
// };

export default CardWrapper;
