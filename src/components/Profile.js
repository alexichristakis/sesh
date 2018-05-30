import React, { Component } from "react";
import { StyleSheet, Easing, Animated, StatusBar, View, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";

import { SB_HEIGHT } from "../lib/constants";

import Groups from "./Groups";
import BackButton from "./global/BackButton";

class Profile extends Component {
	constructor(props) {
		super(props);

		this.entry = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.entry, {
			toValue: 1,
			duration: 300,
			easing: Easing.ease,
			useNativeDriver: true
		}).start();
	}

	dismiss = () => {
		Animated.timing(this.entry, {
			toValue: 0,
			duration: 300,
			easing: Easing.ease,
			useNativeDriver: true
		}).start(() => Navigation.dismissOverlay(this.props.componentId));
	};

	render() {
		return (
			<Animated.View style={{ flex: 1, opacity: this.entry }}>
				<StatusBar barStyle="light-content" />

				<VibrancyView blurType="dark" blurAmount={10} style={styles.vibrancy}>
					<Text style={{ fontSize: 30, paddingHorizontal: 20, fontWeight: "900", color: "white" }}>
						Alexi Christakis
					</Text>
				</VibrancyView>
				<Groups onPressPushTo={this.props.onPressPushTo} />

				<BlurView blurType="dark" blurAmount={10} style={styles.blur} />
				<BackButton onPressPop={this.dismiss} />
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	vibrancy: {
		position: "absolute",
		top: SB_HEIGHT,
		bottom: 0,
		left: 0,
		right: 0
	},
	blur: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: SB_HEIGHT
	}
});

export default Profile;
