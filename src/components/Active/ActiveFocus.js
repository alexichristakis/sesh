import React, { Component } from "react";
import { StyleSheet, Animated, View, TouchableOpacity, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import MapView, { Marker } from "react-native-maps";
// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

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
			pressed: false,
			joined: this.props.joined,
			loading: true,
			position: null
		};
	}

	async componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({ position: position.coords, loading: false });
			},
			error => this.setState({ error: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
					duration: 0
				}
			});
			this.props.closeCard();
		}, 100);
	};

	handlePressIn = () => {
		this.setState({ pressed: true });
		Animated.spring(this.animated, {
			toValue: 0.9,
			useNativeDriver: true
		}).start();
	};

	handlePressOut = () => {
		this.setState({ pressed: false });
		Animated.spring(this.animated, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true
		}).start();
	};

	handleOnPress = () => {
		// ReactNativeHapticFeedback.trigger("impactLight");
		this.setState({ joined: !this.state.joined });
	};

	_renderItem = ({ item }) => <User data={item} />;

	_renderHeader = () => {
		let animatedStyle = {
			transform: [
				{
					scale: this.animated
				}
			]
		};

		let headerTopPadding = SB_HEIGHT === 20 ? 30 : 5;

		return (
			<View style={{ flex: 1, paddingTop: headerTopPadding }}>
				{!this.state.loading && <MapCard location={this.state.position} />}
				{this.state.loading && <View style={{ height: 200, width: 335, borderRadius: 15 }} />}
				<Animated.View style={animatedStyle}>
					<TouchableOpacity
						activeOpacity={1}
						style={[
							styles.joinButton,
							{
								backgroundColor:
									(this.state.joined && !this.state.pressed) ||
									(this.state.pressed && !this.state.joined)
										? Colors.active
										: "white"
							}
						]}
						onPressIn={this.handlePressIn}
						onPressOut={this.handlePressOut}
						onPress={this.handleOnPress}
					>
						<Text
							style={[
								styles.joinText,
								{
									color:
										(this.state.joined && !this.state.pressed) ||
										(this.state.pressed && !this.state.joined)
											? "white"
											: Colors.active
								}
							]}
						>
							{!this.state.joined ? "Join" : "Leave"}
						</Text>
					</TouchableOpacity>
				</Animated.View>
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
				renderItem={this._renderItem}
			>
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
		// backgroundColor: "white",
		...shadow
	},
	joinText: {
		// color: Colors.active,
		fontSize: 18
	}
});

export default ActiveFocus;