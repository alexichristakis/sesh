import React, { Component } from "react";
import { StyleSheet, Easing, Animated, StatusBar, View, Text, Image } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";

import TouchableScale from "./global/TouchableScale";
import BackButton from "./global/BackButton";

import { SB_HEIGHT } from "../lib/constants";

import { FacebookLogout } from "../api";

class Profile extends Component {
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
			duration: 300,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start(() => Navigation.dismissOverlay(this.props.componentId));
	};

	render() {
		return (
			<Animated.View style={{ flex: 1, opacity: this.entry }}>
				<StatusBar barStyle="light-content" />

				<VibrancyView blurType="dark" blurAmount={10} style={styles.vibrancy}>
					<View style={styles.top}>
						<Text style={{ fontSize: 30, fontWeight: "900", color: "white" }}>
							{this.props.user.displayName}
						</Text>
						<TouchableScale
							onPress={() =>
								FacebookLogout().then(() => {
									this.dismiss;
									Navigation.pop(this.props.componentId);
								})
							}>
							<Icon name={"log-out"} size={30} color={"white"} />
						</TouchableScale>
					</View>
				</VibrancyView>

				<BackButton onPressPop={this.dismiss} />
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	vibrancy: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		paddingTop: SB_HEIGHT,
		paddingHorizontal: 10,
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default Profile;
