import React, { Component } from "react";
import {
	Animated,
	View,
	Text,
	Button,
	Image,
	ScrollView,
	TouchableOpacity,
	StatusBar,
	StyleSheet,
	Dimensions,
	Platform,
} from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";
import { Provider, subscribe } from "react-contextual";
import RNFS from "react-native-fs";

import NewMoveButton from "./NewMoveButton";
import TabBar from "./TabBar";
import Groups from "./Groups";
import Currently from "./Currently";
import Later from "./Later";

import { Colors, iconShadow } from "../lib/styles";

import {} from "../api";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

// some contexts
// const DimensionsContext = React.creatContext({
// 	width: SCREEN_WIDTH,
// 	height: SCREEN_HEIGHT,
// 	statusBarHeight: statusBarHeight(),
// });
// class DimensionsProvider extends Component {
// 	state = {
// 		dimensions: {
// 			width: SCREEN_WIDTH,
// 			height: SCREEN_HEIGHT,
// 			statusBarHeight: statusBarHeight(),
// 		},
// 	};
// 	render() {
// 		return (
// 			<DimensionsContext.Provider value={this.state.dimensions}>
// 				{this.props.children}
// 			</DimensionsContext.Provider>
// 		);
// 	}
// }

const xOffset = new Animated.Value(0);
const yOffset = new Animated.Value(0);

const groupsOffset = new Animated.Value(0);
const currentlyOffset = new Animated.Value(0);
const laterOffset = new Animated.Value(0);

function statusBarHeight() {
	if (Platform.OS === "ios" && SCREEN_HEIGHT === 812) return 40;
	else return 20;
}

function Page(props: { children?: ReactElement<*> }) {
	return <View style={{ flex: 1, width: SCREEN_WIDTH }}>{props.children}</View>;
}

function indicatorAnimate() {
	return {
		backgroundColor: xOffset.interpolate({
			inputRange: [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
			outputRange: [Colors.groups, Colors.currently, Colors.later],
		}),
		width: xOffset.interpolate({
			inputRange: [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
			outputRange: [60, 80, 50],
		}),
		transform: [
			{
				translateX: xOffset.interpolate({
					inputRange: [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
					outputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
				}),
			},
		],
	};
}

function textColorTransform(index: number) {
	switch (index) {
		case 0:
			return {
				color: xOffset.interpolate({
					inputRange: [-1 * SCREEN_WIDTH, 0, SCREEN_WIDTH],
					outputRange: [Colors.gray, Colors.groups, Colors.gray],
					extrapolate: "clamp",
				}),
			};
			break;
		case 1:
			return {
				color: xOffset.interpolate({
					inputRange: [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
					outputRange: [Colors.gray, Colors.currently, Colors.gray],
					extrapolate: "clamp",
				}),
			};
			break;
		case 2:
			return {
				color: xOffset.interpolate({
					inputRange: [SCREEN_WIDTH, 2 * SCREEN_WIDTH, 3 * SCREEN_WIDTH],
					outputRange: [Colors.gray, Colors.later, Colors.gray],
					extrapolate: "clamp",
				}),
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
				down: false,
			},

			user: this.props.user,
			photo: "",

			friends: [],
			groups: [],
			moves: [],
		};
	}

	async componentDidMount() {
		// fetch that data
		const url = "https://graph.facebook.com/1779355238751386/picture?type=large";
		const path = RNFS.DocumentDirectoryPath + "/profile_pic.png";
		//
		await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
		const res = await RNFS.readFile(path, "base64");
		this.setState({ photo: "data:image/png;base64," + res, loading: false });
		// console.log(res);
	}

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
		this.groups.list.shortenPadding();
		this.currently.list.shortenPadding();
		this.later.list.shortenPadding();
	};

	lengthenVertPadding = () => {
		this.groups.list.lengthenPadding();
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
		this.groups.list.fadeOut();
		this.currently.list.fadeOut();
		this.later.list.fadeOut();
	};

	returnScreen = () => {
		this.topBar.handleOpenBar();
		this.button.buttonReturn();
		this.groups.list.fadeIn();
		this.currently.list.fadeIn();
		this.later.list.fadeIn();
	};

	onPressPushTo = (componentName, props, options) => {
		Navigation.push(this.props.componentId, {
			component: {
				name: componentName,
				passProps: props,
				options: options,
			},
		});
	};

	onPressPresentModalTo = (componentName, props, options) => {
		Navigation.showModal({
			component: {
				name: componentName,
				passProps: props,
				optoins: options,
			},
		});
	};

	onPressPresentOverlayTo = (componentName, props, options) => {
		Navigation.showOverlay({
			component: {
				name: componentName,
				passProps: props,
				options: {
					overlay: {
						interceptTouchOutside: true,
					},
				},
			},
		});
	};

	render() {
		if (this.state.loading) {
			return <View />;
		} else {
			return (
				<View style={styles.container}>
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
						style={styles.scroll}>
						<Page>
							<Groups
								ref={item => (this.groups = item)}
								profilePic={this.state.photo}
								clearScreen={this.clearScreen}
								returnScreen={this.returnScreen}
								onPressPushTo={this.onPressPushTo}
								_onScrollBegin={this._onScollBegin}
								_onScrollEnd={this._onScrollEnd}
								_vertOnScroll={this._vertOnScroll}
								statusBarHeight={statusBarHeight()}
							/>
						</Page>
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
								statusBarHeight={statusBarHeight()}
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
								statusBarHeight={statusBarHeight()}
							/>
						</Page>
					</Animated.ScrollView>

					<NewMoveButton
						ref={item => (this.button = item)}
						onPressPresentModalTo={this.onPressPresentModalTo}
					/>

					<TabBar
						ref={item => (this.topBar = item)}
						onPressPresentModalTo={this.onPressPresentModalTo}
						onPressPresentOverlayTo={this.onPressPresentOverlayTo}
						profilePic={this.state.photo}
						scrollDir={this.state.scrollDir}
						statusBarHeight={statusBarHeight()}
						scrollToStart={() => this.scrollView.scrollTo({ x: 0, y: 0, animated: true })}
						scrollToMid={() => this.scrollView.scrollTo({ x: SCREEN_WIDTH, y: 0, animated: true })}
						scrollToEnd={() => this.scrollView.scrollToEnd()}
						xOffset={xOffset}
						textColorTransform={textColorTransform}
						indicatorAnimate={indicatorAnimate}
					/>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	statusBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	scroll: {
		flex: 1,
		flexDirection: "row",
	},
	icon: {
		position: "absolute",
		borderRadius: 15,
		height: 30,
		width: 30,
		bottom: 20,
		alignSelf: "center",
		overflow: "visible",
		marginBottom: 15,
		// ...iconShadow,
	},
	iconBackground: {
		position: "absolute",
		opacity: 1,
		height: 35,
		width: 35,
		bottom: 20,
		alignSelf: "center",
		overflow: "visible",
		marginBottom: 15,
		...iconShadow,
	},
});

export default Home;
