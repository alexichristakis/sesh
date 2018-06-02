import React, { Component } from "react";
import { StyleSheet, Animated, View, TouchableOpacity, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import MapView, { Marker } from "react-native-maps";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

import TouchableScale from "../global/TouchableScale";
import Focus from "../global/Focus";
import MapCard from "../global/MapCard";
import User from "../global/User";
import ActiveMove from "./ActiveMove";

const data = [];

class ActiveFocus extends Component {
	constructor(props) {
		super(props);

		this.animated = new Animated.Value(1);

		this.state = {
			joined: this.props.joined,
			loading: true,
			position: null,
		};
	}

	async componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({ position: position.coords, loading: false });
			},
			error => this.setState({ error: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		);
	}

	onPressPop = () => {
		if (this.state.joined) this.props.joinMove(this.props.data.id);
		else this.props.leaveMove(this.props.data.id);

		this.focus.exit();
		setTimeout(() => {
			Navigation.pop(this.props.componentId, {
				customTransition: {
					animations: [],
					duration: 0,
				},
			});
			this.props.closeCard();
		}, 100);
	};

	handlePressIn = () => {
		Animated.spring(this.animated, {
			toValue: 0.9,
			useNativeDriver: true,
		}).start();
	};

	handlePressOut = () => {
		Animated.spring(this.animated, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
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
					scale: this.animated,
				},
			],
		};

		let headerTopPadding = SB_HEIGHT === 20 ? 30 : 5;

		return (
			<View style={{ flex: 1, paddingTop: headerTopPadding }}>
				{!this.state.loading && <MapCard location={this.state.position} />}
				{this.state.loading && <View style={{ height: 200, width: 335, borderRadius: 15 }} />}
				<TouchableScale
					style={[
						styles.joinButton,
						{
							backgroundColor: this.state.joined ? Colors.active : "white",
						},
					]}
					onPress={this.handleOnPress}>
					<Text
						style={[
							styles.joinText,
							{
								color: this.state.joined ? "white" : Colors.active,
							},
						]}>
						{!this.state.joined ? "Join" : "Leave"}
					</Text>
				</TouchableScale>
			</View>
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
				renderItem={this._renderItem}>
				<ActiveMove index={this.props.index} length={this.props.length} move={this.props.data} />
			</Focus>
		);
	}
}

const styles = StyleSheet.create({
	joinButton: {
		marginVertical: 20,
		padding: 15,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		// ...shadow,
	},
	joinText: {
		// flex: 1,
		// color: Colors.active,
		fontSize: 18,
	},
});

export default ActiveFocus;
