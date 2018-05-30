import React, { Component } from "react";
import {
	Animated,
	View,
	ScrollView,
	StatusBar,
	StyleSheet,
	Dimensions,
	Platform
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";
import RNFS from "react-native-fs";

import NewMoveButton from "./NewMoveButton";
import TabBar from "./TabBar";
import Groups from "./Groups";
import Currently from "./Currently";
import Later from "./Later";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../lib/constants";
import { Colors } from "../lib/styles";

/* import fetch functions */
import {} from "../api";

const xOffset = new Animated.Value(0);
const yOffset = new Animated.Value(0);

const groupsOffset = new Animated.Value(0);
const currentlyOffset = new Animated.Value(0);
const laterOffset = new Animated.Value(0);

function Page(props: { children?: ReactElement<*> }) {
	return <View style={{ flex: 1, width: SCREEN_WIDTH }}>{props.children}</View>;
}

function indicatorAnimate() {
	return {
		backgroundColor: xOffset.interpolate({
			inputRange: [0, SCREEN_WIDTH],
			outputRange: [Colors.currently, Colors.later]
		}),
		width: xOffset.interpolate({
			inputRange: [0, SCREEN_WIDTH],
			outputRange: [80, 50]
		}),
		transform: [
			{
				translateX: xOffset.interpolate({
					inputRange: [0, SCREEN_WIDTH],
					outputRange: [-SCREEN_WIDTH / 4, SCREEN_WIDTH / 4]
				})
			}
		]
	};
}

function textColorTransform(index: number) {
	switch (index) {
		case 0:
			return {
				color: xOffset.interpolate({
					inputRange: [0, SCREEN_WIDTH],
					outputRange: [Colors.currently, Colors.gray],
					extrapolate: "clamp"
				})
			};
			break;
		case 1:
			return {
				color: xOffset.interpolate({
					inputRange: [0, SCREEN_WIDTH],
					outputRange: [Colors.gray, Colors.later],
					extrapolate: "clamp"
				})
			};
			break;
	}
}

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			barOpen: true,
			vertScrolling: false,
			scrollDir: {
				up: false,
				down: false
			},

			user: this.props.user,
			photo: "",

			friends: [],
			groups: [],
			moves: []
		};
	}

	// componentDidMount() {
	// 	// fetch that data
	// 	// const url = "https://graph.facebook.com/1779355238751386/picture?type=large";
	// 	const path = RNFS.DocumentDirectoryPath + "/profile_pic.png";
	// 	//
	// 	// await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
	// 	RNFS.readFile(path, "base64").then(res => {
	// 		console.log("finished");
	// 		this.setState({ photo: "data:image/png;base64," + res, loading: false });
	// 	});
	// 	// console.log(res);
	// }

	_horizOnScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }], {
		// useNativeDriver: true,
	});

	_onHorizScrollEnd = () => {
		if (xOffset._value == 0) yOffset = groupsOffset;
		else if (xOffset._value == SCREEN_WIDTH) yOffset = currentlyOffset;
		else yOffset = laterOffset;
	};

	_vertOnScroll = event => {
		const currentOffset = event.nativeEvent.contentOffset.y;
		if (this.state.vertScrolling) {
			const diff = currentOffset - (yOffset || 0);
			if (diff <= 0) {
				this.lengthenVertPadding();
				this.setState({ scrollDir: { up: true, down: false } });
			} else {
				this.shortenVertPadding();
				this.setState({ scrollDir: { up: false, down: true } });
			}
			this.setState({ vertScrolling: false });
		}
		yOffset = currentOffset;
		if (xOffset._value == 0) groupsOffset = yOffset;
		else if (xOffset._value == SCREEN_WIDTH) currentlyOffset = yOffset;
		else laterOffset = yOffset;
	};

	shortenVertPadding = () => {
		this.currently.list.shortenPadding();
		this.later.list.shortenPadding();
	};

	lengthenVertPadding = () => {
		this.currently.list.lengthenPadding();
		this.later.list.lengthenPadding();
	};

	scrollViewRef = view => {
		this.scrollView = view.getNode();
	};

	_onScollBegin = () => {
		this.setState({ vertScrolling: true });
	};

	_onScrollEnd = () => {
		this.setState({ vertScrolling: false });
	};

	clearScreen = () => {
		this.topBar.handleFullCloseBar();
		this.button.buttonExit();
		// this.groups.list.fadeOut();
		// this.currently.list.fadeOut();
		// this.later.list.fadeOut();
	};

	returnScreen = () => {
		this.topBar.handleOpenBar();
		this.button.buttonReturn();
		// this.groups.list.fadeIn();
		// this.currently.list.fadeIn();
		// this.later.list.fadeIn();
	};

	onPressPushTo = (componentName, props, options) => {
		Navigation.push(this.props.componentId, {
			component: {
				name: componentName,
				passProps: props,
				options: options
			}
		});
	};

	onPressPresentModalTo = (componentName, props, options) => {
		Navigation.showModal({
			component: {
				name: componentName,
				passProps: props,
				options: options
			}
		});
	};

	onPressPresentOverlayTo = (componentName, props, options) => {
		Navigation.showOverlay({
			component: {
				name: componentName,
				passProps: props,
				options: {
					overlay: {
						interceptTouchOutside: true
					}
				}
			}
		});
	};

	render() {
		// if (this.state.loading) {
		// 	return <View />;
		// } else {
		return (
			<View style={styles.container}>
				{/* <LinearGradient
				style={styles.container}
				locations={[0.5, 1]}
				colors={["white", Colors.groups]}
			> */}
				<StatusBar barStyle="dark-content" />
				<Animated.ScrollView
					horizontal
					pagingEnabled
					bounces={false}
					ref={this.scrollViewRef}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					onScroll={this._horizOnScroll}
					onMomentumScrollEnd={this._onHorizScrollEnd}
					style={styles.scroll}
				>
					<Page>
						<Currently
							ref={item => (this.currently = item)}
							profilePic={this.state.photo}
							clearScreen={this.clearScreen}
							returnScreen={this.returnScreen}
							onPressPushTo={this.onPressPushTo}
							_onScrollBegin={this._onScollBegin}
							_onScrollEnd={this._onScrollEnd}
							_vertOnScroll={this._vertOnScroll}
						/>
					</Page>
					<Page>
						<Later
							ref={item => (this.later = item)}
							profilePic={this.state.photo}
							clearScreen={this.clearScreen}
							returnScreen={this.returnScreen}
							onPressPushTo={this.onPressPushTo}
							_onScrollBegin={this._onScollBegin}
							_onScrollEnd={this._onScrollEnd}
							_vertOnScroll={this._vertOnScroll}
						/>
					</Page>
				</Animated.ScrollView>

				<NewMoveButton
					ref={item => (this.button = item)}
					onPressPresentModalTo={this.onPressPresentModalTo}
				/>

				<TabBar
					ref={item => (this.topBar = item)}
					onPressPushTo={this.onPressPushTo}
					onPressPresentModalTo={this.onPressPresentModalTo}
					onPressPresentOverlayTo={this.onPressPresentOverlayTo}
					profilePic={this.state.photo}
					scrollDir={this.state.scrollDir}
					scrollToStart={() => this.scrollView.scrollTo({ x: 0, y: 0, animated: true })}
					scrollToEnd={() => this.scrollView.scrollToEnd()}
					xOffset={xOffset}
					textColorTransform={textColorTransform}
					indicatorAnimate={indicatorAnimate}
				/>
				{/* </LinearGradient> */}
			</View>
		);
		// }
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightGray
	},
	scroll: {
		flex: 1,
		flexDirection: "row"
	}
});

export default Home;
