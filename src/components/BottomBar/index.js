import React, { Component } from "react";
import { Animated, Easing } from "react-native";

import NavBar from "./NavBar";
import NewMoveButton from "./NewMoveButton";

const yTranslate = new Animated.Value(0);

class BottomBar extends Component {
	handleHideBar = () => {
		if (this.button.state.open) this.button.handleCloseButton();
		Animated.timing(yTranslate, {
			toValue: 1,
			duration: 150,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start();
	};

	handleShowBar = () => {
		Animated.timing(yTranslate, {
			toValue: 0,
			duration: 150,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start();
	};

	render() {
		let animatedStyle = {
			transform: [
				{
					translateY: yTranslate.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 80],
					}),
				},
			],
		};

		return (
			<Animated.View style={animatedStyle}>
				<NavBar
					scrollToStart={this.props.scrollToStart}
					scrollToEnd={this.props.scrollToEnd}
					textColorTransform={this.props.textColorTransform}
					indicatorAnimate={this.props.indicatorAnimate}
				/>
				<NewMoveButton
					ref={item => (this.button = item)}
					onPressPresentModalTo={this.onPressPresentModalTo}
				/>
			</Animated.View>
		);
	}
}

export default BottomBar;
