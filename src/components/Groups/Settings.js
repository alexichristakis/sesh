import React, { Component } from "react";
import { StyleSheet, Easing, Animated, TouchableOpacity, View, Text, Image } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";

import ColorButton from "../global/ColorButton";

import { Colors } from "../../lib/styles";
import { SB_HEIGHT } from "../../lib/constants";

class Settings extends Component {
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

	quickDismiss = () => {
		Animated.timing(this.entry, {
			toValue: 0,
			duration: 100,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start(() => Navigation.dismissOverlay(this.props.componentId));
	};

	render() {
		let translate = {
			transform: [
				{
					translateY: this.entry.interpolate({
						inputRange: [0, 1],
						outputRange: [500, 0],
					}),
				},
			],
		};

		let textStyle = {
			fontSize: 16,
		};

		return (
			<Animated.View style={[styles.background, { opacity: this.entry }]}>
				<Animated.View style={[styles.container, translate]}>
					<Text
						style={{ alignSelf: "center", color: Colors.primary, fontSize: 20, marginBottom: 10 }}>
						{this.props.name}
					</Text>
					<ColorButton textStyle={textStyle} title={"edit name"} color={Colors.primary} />
					<ColorButton textStyle={textStyle} title={"add members"} color={Colors.primary} />
					<ColorButton textStyle={textStyle} title={"leave group"} color={Colors.primary} />
					<TouchableOpacity style={{ alignSelf: "center", paddingTop: 10 }} onPress={this.dismiss}>
						<Text style={{ color: Colors.primary, fontSize: 16 }}>cancel</Text>
					</TouchableOpacity>
				</Animated.View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(200,200,200,0.4)",
	},
	container: {
		// alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
	},
});

export default Settings;
