import React, { Component } from "react";
import { Animated, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { Colors, shadow } from "../lib/styles";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const BAR_HEIGHT = 80;
const ICON_DIMENSION = 60;

class TabBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: true,
		};

		this.animated = new Animated.Value(1);

		this.groupsScale = new Animated.Value(1);
		this.currentlyScale = new Animated.Value(1);
		this.laterScale = new Animated.Value(1);

		this.profileScale = new Animated.Value(1);
		this.addFriendScale = new Animated.Value(1);
		this.createGroupScale = new Animated.Value(1);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.open && nextProps.scrollDir.down) this.handleCloseBar();
		else if (!this.state.open && nextProps.scrollDir.up) this.handleOpenBar();
	}

	onLoad = () => {
		// console.log("loaded");
		// this.setState({ loading: false });
		Animated.timing(this._imageOpacity, {
			toValue: 1,
			duration: 1000,
		}).start();
	};

	handleFullCloseBar = () => {
		console.log("closing bar");
		const duration = 150;
		this.setState({ open: false });
		Animated.parallel([
			Animated.timing(this.animated, {
				toValue: -1,
				duration: duration,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.profileScale, {
				toValue: 0.3,
				duration: duration,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.addFriendScale, {
				toValue: 0.3,
				duration: duration,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.createGroupScale, {
				toValue: 0.3,
				duration: duration,
				useNativeDriver: true,
			}).start(),
		]);
	};

	handleCloseBar = () => {
		console.log("closing bar");
		this.setState({ open: false });
		Animated.parallel([
			Animated.timing(this.animated, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.profileScale, {
				toValue: 0.3,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.addFriendScale, {
				toValue: 0.3,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.createGroupScale, {
				toValue: 0.3,
				useNativeDriver: true,
			}).start(),
		]);
	};

	handleOpenBar = () => {
		console.log("opening bar");
		this.setState({ open: true });
		Animated.parallel([
			Animated.timing(this.animated, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.profileScale, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.addFriendScale, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start(),
			Animated.timing(this.createGroupScale, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start(),
		]);
	};

	handlePressIn = animatedValue => {
		ReactNativeHapticFeedback.trigger("impactLight");
		Animated.spring(animatedValue, {
			toValue: 0.9,
			useNativeDriver: true,
		}).start();
	};

	handlePressOut = animatedValue => {
		setTimeout(() => {
			ReactNativeHapticFeedback.trigger("impactLight");
		}, 50);
		Animated.spring(animatedValue, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	render() {
		const SCREEN_WIDTH = this.props.SCREEN_WIDTH;
		const textColorTransform = this.props.textColorTransform;
		const indicatorAnimate = this.props.indicatorAnimate;
		const buttonTranslate = {
			translateY: this.animated.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 50],
			}),
		};
		const opacity = {
			opacity: this.animated.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1],
			}),
		};
		let profileButtonAnimatedStyle = {
			transform: [buttonTranslate, { scale: this.profileScale }],
			...opacity,
			// transform: [buttonTranslate],
		};

		let addFriendAnimatedStyle = {
			transform: [buttonTranslate, { scale: this.addFriendScale }],
			...opacity,
			// transform: [buttonTranslate],
		};

		let createGroupAnimatedStyle = {
			transform: [buttonTranslate, { scale: this.createGroupScale }],
			...opacity,
			// transform: [buttonTranslate],
		};

		let blurContainerAnimatedStyle = {
			transform: [
				{
					translateY: this.animated.interpolate({
						inputRange: [0, 1],
						outputRange: [-BAR_HEIGHT, 0],
					}),
				},
			],
		};

		let tabContainerAnimatedStyle = {
			transform: [
				{
					translateY: this.animated.interpolate({
						inputRange: [0, 1],
						outputRange: [0, BAR_HEIGHT],
					}),
				},
			],
		};

		// console.log(this.props.profilePic);

		return (
			<View style={[styles.container, { paddingTop: this.props.statusBarHeight + 10 }]}>
				<Animated.View style={[styles.animated, blurContainerAnimatedStyle]}>
					<BlurView
						blurType="xlight"
						style={[styles.statusBar, { height: this.props.statusBarHeight + BAR_HEIGHT + 30 }]}
					/>
				</Animated.View>

				<View style={{ flexDirection: "row", top: -50 }}>
					<Animated.View style={[styles.profileButton, profileButtonAnimatedStyle]}>
						<TouchableOpacity
							activeOpacity={0.9}
							onPressIn={() => this.handlePressIn(this.profileScale)}
							onPressOut={() => this.handlePressOut(this.profileScale)}
							onPress={() => this.props.onPressPresentOverlayTo("sesh.Profile")}>
							<Animated.Image
								style={styles.image}
								resizeMode="cover"
								source={{ uri: this.props.profilePic }}
							/>
						</TouchableOpacity>
					</Animated.View>
					<Animated.Text style={[styles.title, ...opacity, profileButtonAnimatedStyle]}>
						Sesh
					</Animated.Text>

					<View style={{ flex: 5 }} />
					<Animated.View
						style={[styles.addFriendButton, addFriendAnimatedStyle, { marginRight: 10 }]}>
						<TouchableOpacity
							style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
							activeOpacity={1}
							onPressIn={() => this.handlePressIn(this.addFriendScale)}
							onPressOut={() => this.handlePressOut(this.addFriendScale)}
							onPress={() => this.props.onPressPresentModalTo("sesh.AddFriend")}>
							<Icon name="user-plus" size={25} color={Colors.primary} />
						</TouchableOpacity>
					</Animated.View>
					<Animated.View style={[styles.addGroupButton, createGroupAnimatedStyle]}>
						<TouchableOpacity
							style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
							activeOpacity={1}
							onPressIn={() => this.handlePressIn(this.createGroupScale)}
							onPressOut={() => this.handlePressOut(this.createGroupScale)}
							onPress={() => this.props.onPressPresentModalTo("sesh.CreateGroup")}>
							<Icon name="users" size={25} color={Colors.groups} />
						</TouchableOpacity>
					</Animated.View>
				</View>

				<Animated.View
					style={[styles.animated, tabContainerAnimatedStyle, { top: this.props.statusBarHeight }]}>
					<View style={styles.textContainer}>
						<TouchableOpacity
							style={styles.button}
							// onPressIn={() => this.handlePressIn(this.groupsScale)}
							// onPressOut={() => this.handlePressOut(this.groupsScale)}
							onPress={this.props.scrollToStart}>
							<Animated.Text
								style={[
									styles.text,
									// {
									// 	transform: [{ scale: this.groupsScale }],
									// },
									textColorTransform(0),
								]}>
								Groups
							</Animated.Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							// onPressIn={() => this.handlePressIn(this.currentlyScale)}
							// onPressOut={() => this.handlePressOut(this.currentlyScale)}
							onPress={this.props.scrollToMid}>
							<Animated.Text
								style={[
									styles.text,
									// {
									// 	transform: [{ scale: this.currentlyScale }],
									// },
									textColorTransform(1),
								]}>
								Currently
							</Animated.Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							// onPressIn={() => this.handlePressIn(this.laterScale)}
							// onPressOut={() => this.handlePressOut(this.laterScale)}
							onPress={this.props.scrollToEnd}>
							<Animated.Text
								style={[
									styles.text,
									// {
									// 	transform: [{ scale: this.laterScale }],
									// },
									textColorTransform(2),
								]}>
								Later
							</Animated.Text>
						</TouchableOpacity>
					</View>
					<Animated.View style={[styles.indicator, indicatorAnimate()]} />
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "red",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 10,
		// borderBottomWidth: StyleSheet.hairlineWidth,
		// borderColor: "black",
	},
	statusBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	animated: {
		position: "absolute",
		left: 0,
		right: 0,
	},
	title: {
		marginLeft: 50,
		// flex: 1,
		fontSize: 36,
		fontWeight: "900",
		alignSelf: "center",
	},
	textContainer: {
		justifyContent: "center",
		// alignItems: "center",
		flexDirection: "row",
		position: "absolute",
		// padding: 20,
		// top: 60,
		// left: 0,
		// right: 0,
	},
	button: {
		flex: 1,
	},
	profileButton: {
		flex: 1,
		// flexDirection: "row",
		// backgroundColor: "red",
	},
	addFriendButton: {
		// flex: 1,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: Colors.primary,
		backgroundColor: "white",
		// borderWidth: StyleSheet.hairlineWidth,
		// borderColor: Colors.gray,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 25,
		height: 50,
		width: 50,
		...shadow,
	},
	addGroupButton: {
		// flex: 1,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",

		// backgroundColor: Colors.groups,
		// borderWidth: StyleSheet.hairlineWidth,
		// borderColor: Colors.gray,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 25,
		height: 50,
		width: 50,
		...shadow,
	},
	image: {
		// flex: 1,
		backgroundColor: Colors.gray,
		borderRadius: ICON_DIMENSION / 2,
		height: ICON_DIMENSION,
		width: ICON_DIMENSION,
	},
	text: {
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
		textAlignVertical: "center",
		textAlign: "center",
		// paddingBottom: 10,
	},
	indicator: {
		top: 22,
		// top: 0,
		height: 3,
		alignSelf: "center",
		borderRadius: 2,
	},
});

export default TabBar;
