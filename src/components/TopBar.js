import React, { Component } from "react";
import {
	Animated,
	Easing,
	ActivityIndicator,
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity
} from "react-native";

import RNFS from "react-native-fs";
import { BlurView, VibrancyView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";
// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../lib/constants";
import { Colors, shadow } from "../lib/styles";

const BAR_HEIGHT = 40;
const ICON_DIMENSION = 60;

class TopBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: true,
			loading: true,
			photo: RNFS.DocumentDirectoryPath + "/profile_pic.png"
		};

		this.animated = new Animated.Value(1);

		this.groupsScale = new Animated.Value(1);
		this.activeScale = new Animated.Value(1);
		this.laterScale = new Animated.Value(1);

		this.profileScale = new Animated.Value(1);
		this.addFriendScale = new Animated.Value(1);
		this.createGroupScale = new Animated.Value(1);
	}

	componentWillReceiveProps(nextProps) {
		// console.log("new props");
		if (this.state.open && nextProps.scrollDir.down) this.handleCloseBar();
		else if (!this.state.open && nextProps.scrollDir.up) this.handleOpenBar();
	}

	componentDidMount() {
		// fetch that data
		// const url = "https://graph.facebook.com/1779355238751386/picture?type=large";
		// const path = RNFS.DocumentDirectoryPath + "/profile_pic.png";
		// //
		// // await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
		// RNFS.readFile(path, "base64").then(res => {
		// 	// console.log("finished");
		// 	this.setState({ photo: "data:image/png;base64," + res, loading: false });
		// });
		// console.log(res);
	}

	handleFullCloseBar = () => {
		const duration = 150;
		this.setState({ open: false });
		Animated.parallel([
			Animated.timing(this.animated, {
				toValue: -1,
				duration: duration,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.profileScale, {
				toValue: 0.3,
				duration: duration,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.addFriendScale, {
				toValue: 0.3,
				duration: duration,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.createGroupScale, {
				toValue: 0.3,
				duration: duration,
				useNativeDriver: true
			}).start()
		]);
	};

	handleCloseBar = () => {
		this.setState({ open: false });
		Animated.parallel([
			Animated.timing(this.animated, {
				toValue: 0,
				duration: 250,
				easing: Easing.ease,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.profileScale, {
				toValue: 0.3,
				duration: 250,
				easing: Easing.ease,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.addFriendScale, {
				toValue: 0.3,
				duration: 250,
				easing: Easing.ease,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.createGroupScale, {
				toValue: 0.3,
				duration: 250,
				easing: Easing.ease,
				useNativeDriver: true
			}).start()
		]);
	};

	handleOpenBar = () => {
		this.setState({ open: true });
		Animated.parallel([
			Animated.timing(this.animated, {
				toValue: 1,
				duration: 250,
				easing: Easing.ease,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.profileScale, {
				toValue: 1,
				duration: 250,
				easing: Easing.ease,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.addFriendScale, {
				toValue: 1,
				duration: 250,
				easing: Easing.ease,
				useNativeDriver: true
			}).start(),
			Animated.timing(this.createGroupScale, {
				toValue: 1,
				duration: 250,
				easing: Easing.ease,
				useNativeDriver: true
			}).start()
		]);
	};

	handlePressIn = animatedValue => {
		Animated.spring(animatedValue, {
			toValue: 0.9,
			useNativeDriver: true
		}).start();
	};

	handlePressOut = animatedValue => {
		Animated.spring(animatedValue, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true
		}).start();
	};

	haptic = func => {
		// ReactNativeHapticFeedback.trigger("impactLight");
		func;
	};

	render() {
		const textColorTransform = this.props.textColorTransform;
		const indicatorAnimate = this.props.indicatorAnimate;

		/* navigation functions */
		const presentModal = this.props.onPressPresentModalTo;
		const presentStackModal = this.props.onPressPresentModalToStack;
		const presentOverlay = this.props.onPressPresentOverlayTo;
		const pushTo = this.props.onPressPushTo;
		const { scrollToStart, scrollToEnd } = this.props;

		const buttonTranslate = {
			translateY: this.animated.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 50]
			})
		};

		let profileButtonAnimatedStyle = {
			transform: [buttonTranslate, { scale: this.profileScale }],
			opacity: this.animated
		};

		let addFriendAnimatedStyle = {
			transform: [buttonTranslate, { scale: this.addFriendScale }],
			opacity: this.animated
		};

		let createGroupAnimatedStyle = {
			transform: [buttonTranslate, { scale: this.createGroupScale }],
			opacity: this.animated
		};

		let blurContainerAnimatedStyle = {
			transform: [
				{
					translateY: this.animated.interpolate({
						inputRange: [0, 1],
						outputRange: [-BAR_HEIGHT - 30, 0]
					})
				}
			]
		};

		let tabContainerAnimatedStyle = {
			transform: [
				{
					translateY: this.animated.interpolate({
						inputRange: [0, 1],
						// outputRange: [0, BAR_HEIGHT]
						outputRange: [-BAR_HEIGHT + SB_HEIGHT - 2, BAR_HEIGHT + 4]
					})
				}
			]
		};

		return (
			<View style={styles.container}>
				<Animated.View style={[styles.animated, blurContainerAnimatedStyle]}>
					<BlurView blurType="xlight" style={styles.statusBar} />
				</Animated.View>

				<View style={styles.topBar}>
					<Animated.View style={[styles.addFriendButton, addFriendAnimatedStyle]}>
						<TouchableOpacity
							style={styles.fillCenter}
							activeOpacity={1}
							onPressIn={() => this.handlePressIn(this.addFriendScale)}
							onPressOut={() => this.handlePressOut(this.addFriendScale)}
							onPress={() => this.haptic(presentModal("sesh.AddFriend"))}
						>
							<Icon name="user-plus" size={30} color={Colors.primary} />
						</TouchableOpacity>
					</Animated.View>
					<Animated.View style={[styles.profileButton, profileButtonAnimatedStyle]}>
						<TouchableOpacity
							activeOpacity={0.9}
							onPressIn={() => this.handlePressIn(this.profileScale)}
							onPressOut={() => this.handlePressOut(this.profileScale)}
							onPress={() =>
								this.haptic(presentOverlay("sesh.Profile", { onPressPushTo: presentOverlay }))
							}
						>
							<Image style={styles.image} resizeMode="cover" source={{ uri: this.state.photo }} />
						</TouchableOpacity>
					</Animated.View>
					<Animated.View style={[styles.addGroupButton, createGroupAnimatedStyle]}>
						<TouchableOpacity
							style={styles.fillCenter}
							activeOpacity={1}
							onPressIn={() => this.handlePressIn(this.createGroupScale)}
							onPressOut={() => this.handlePressOut(this.createGroupScale)}
							onPress={() => this.haptic(presentStackModal("sesh.Groups"))}
						>
							<Icon style={{ paddingLeft: 5 }} name="users" size={30} color={Colors.primary} />
						</TouchableOpacity>
					</Animated.View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 10
	},
	fillCenter: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	topBar: {
		marginHorizontal: 5,
		paddingTop: SB_HEIGHT,
		flexDirection: "row",
		top: -50
	},
	statusBar: {
		position: "absolute",
		top: -SB_HEIGHT,
		left: 0,
		right: 0,
		height: SB_HEIGHT + BAR_HEIGHT + 30
	},
	animated: {
		position: "absolute",
		left: 0,
		right: 0,
		top: SB_HEIGHT
	},
	title: {
		marginLeft: 50,
		// flex: 1,
		fontSize: 36,
		fontWeight: "900",
		alignSelf: "center"
	},
	textContainer: {
		justifyContent: "center",
		// alignItems: "center",
		flexDirection: "row",
		position: "absolute"
		// padding: 20,
		// top: 60,
		// left: 0,
		// right: 0,
	},
	button: {
		flex: 1
	},
	profileButton: {
		flex: 3,
		alignItems: "center"
		// flexDirection: "row",
	},
	addFriendButton: {
		flex: 1,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: Colors.primary,
		// backgroundColor: "white",
		// borderWidth: StyleSheet.hairlineWidth,
		// borderColor: Colors.gray,
		// borderWidth: 2,
		// borderColor: "white",
		// borderRadius: 25,
		height: 50,
		width: 50
		// ...shadow
	},
	addGroupButton: {
		flex: 1,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "white",

		// backgroundColor: Colors.groups,
		// borderWidth: StyleSheet.hairlineWidth,
		// borderColor: Colors.gray,
		// borderWidth: 2,
		// borderColor: "white",
		// borderRadius: 25,
		height: 50,
		width: 50
		// ...shadow
	},
	image: {
		flex: 1,
		backgroundColor: Colors.gray,
		borderRadius: ICON_DIMENSION / 2,
		height: ICON_DIMENSION,
		width: ICON_DIMENSION
	},
	text: {
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
		textAlignVertical: "center",
		textAlign: "center"
		// paddingBottom: 10,
	},
	indicator: {
		top: 22,
		// top: 0,
		height: 3,
		alignSelf: "center",
		borderRadius: 2
	}
});

export default TopBar;
