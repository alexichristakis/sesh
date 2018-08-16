import React, { Component } from "react";
import { View, Animated } from "react-native";

import TouchableScale from "../global/TouchableScale";

class Transition extends Component {
	opacity = new Animated.Value(1);

	handleTransition = () => {
		this.onLeave();
		this.view.measure((x, y, width, height, pageX, pageY) => {
			const dimensions = { x, y, width, height, pageX, pageY };
			this.props.transition({
				props: {
					...dimensions,
					onReturn: this.onReturn
				}
			});
		});
	};

	onLeave = () => {
		Animated.timing(this.opacity, {
			toValue: 0,
			delay: 45,
			duration: 25,
			useNativeDriver: true
		}).start();
	};

	onReturn = () => {
		return new Promise(resolve => {
			Animated.timing(this.opacity, {
				toValue: 1,
				duration: 5,
				useNativeDriver: true
			}).start(() => resolve(true));
		});
	};

	render() {
		return (
			<View ref={view => (this.view = view)}>
				<TouchableScale animatedStyle={{ opacity: this.opacity }} onPress={this.handleTransition}>
					{this.props.children}
				</TouchableScale>
			</View>
		);
	}
}

export default Transition;
