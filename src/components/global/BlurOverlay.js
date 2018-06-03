import React, { Component } from "react";
import { StyleSheet, Easing, Animated, StatusBar, View, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";

import BackButton from "./BackButton";

import { SB_HEIGHT } from "../../lib/constants";

class BlurOverlay extends Component {
	constructor(props) {
		super(props);

		this.entry = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.entry, {
			toValue: 1,
			duration: 100,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start();
	}

	dismiss = () => {
		Animated.timing(this.entry, {
			toValue: 0,
			duration: 100,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start(() => {
			Navigation.dismissOverlay(this.props.componentId);
			if (this.props.onExit) this.props.onExit();
		});
	};

	render() {
		return (
			<Animated.View style={{ flex: 1, opacity: this.entry }}>
				<StatusBar barStyle="light-content" />
				{this.props.vibrancy && (
					<VibrancyView blurType="dark" blurAmount={10} style={styles.blur}>
						{this.props.children}
					</VibrancyView>
				)}
				{!this.props.vibrancy && (
					<BlurView blurType="dark" blurAmount={10} style={styles.blur}>
						{this.props.children}
					</BlurView>
				)}
				<BackButton onPressPop={this.dismiss} />
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	blur: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		paddingTop: SB_HEIGHT,
		paddingHorizontal: 10,
	},
});

export default BlurOverlay;
