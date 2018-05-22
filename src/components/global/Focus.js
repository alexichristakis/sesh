import React, { Component } from "react";
import { Animated, Easing, View, Text, Image, FlatList } from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import { Colors, shadow } from "../../lib/styles";

import BackButton from "../global/BackButton";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Focus extends Component {
	constructor(props) {
		super(props);

		this.entry = new Animated.Value(0);
	}

	componentWillMount() {
		Animated.timing(this.entry, {
			toValue: 1,
			duration: 500,
			easing: Easing.poly(0.25),
			useNativeDriver: true,
		}).start();
	}

	exit = () => {
		Animated.timing(this.entry, {
			toValue: 0,
			duration: 750,
			easing: Easing.poly(0.25),
			useNativeDriver: true,
		}).start();
	};

	_keyExtractor = item => item.id.toString();

	render() {
		const listTopPadding = this.props.cardHeight + this.props.statusBarHeight - 20;

		let animatedEntry = {
			transform: [
				{
					translateY: this.entry.interpolate({
						inputRange: [0, 1],
						outputRange: [300, 0],
					}),
				},
			],
		};

		return (
			<View style={{ flex: 1, backgroundColor: Colors.lightGray }}>
				<AnimatedFlatList
					style={[{ flex: 1, paddingTop: listTopPadding }, animatedEntry]}
					data={this.props.data}
					keyExtractor={this._keyExtractor}
					renderItem={this.props.renderItem}
				/>
				<View style={[styles.moveContainer, { top: this.props.statusBarHeight + 10 }]}>
					{this.props.children}
				</View>
				<BackButton onPressPop={this.props.onPressPop} />
				<BlurView
					blurType="xlight"
					style={[styles.statusBar, { height: this.props.statusBarHeight }]}
				/>
			</View>
		);
	}
}

const styles = {
	moveContainer: {
		backgroundColor: "white",
		borderRadius: 15,
		position: "absolute",
		padding: 10,
		left: 10,
		right: 10,
		...shadow,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		justifyContent: "center",
	},
	statusBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
};

export default Focus;
