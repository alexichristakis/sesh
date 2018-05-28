import React, { Component } from "react";
import { Easing, Animated, View, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";

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
				<VibrancyView blurType="prominent" blurAmount={10} style={{ flex: 1, padding: 50 }}>
					<Text style={{ fontSize: 30, fontWeight: "900", color: "white" }}>Alexi Christakis</Text>
					<BackButton onPressPop={this.dismiss} />
				</VibrancyView>
			</Animated.View>
		);
	}
}

export default Profile;
