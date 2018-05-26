import React, { Component } from "react";
import {
	Animated,
	Easing,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	Image,
	FlatList
} from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";

import { Colors, heavyShadow, shadow } from "../../lib/styles";

import BackButton from "../global/BackButton";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

function Page(props: { children?: ReactElement<*> }) {
	return <View style={{ flex: 1, width: SCREEN_WIDTH }}>{props.children}</View>;
}

function HalfPage(props: { children?: ReactElement<*> }) {
	return <View style={{ flex: 1, width: SCREEN_WIDTH / 2 }}>{props.children}</View>;
}

class Focus extends Component {
	constructor(props) {
		super(props);

		this.entry = new Animated.Value(0);
	}

	componentWillMount() {
		Animated.timing(this.entry, {
			toValue: 1,
			duration: 250,
			easing: Easing.poly(0.25),
			useNativeDriver: true
		}).start();
	}

	exit = () => {
		Animated.timing(this.entry, {
			toValue: 0,
			duration: 500,
			easing: Easing.poly(0.25),
			useNativeDriver: true
		}).start();
	};

	_keyExtractor = item => item.id.toString();

	renderSeparator = () => {
		const separatorHeight = 1;
		return (
			<View style={styles.separatorContainer}>
				<View style={styles.separatorBackground} />
				<View style={styles.separator} />
			</View>
		);
	};

	renderHeader = () => {
		return (
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
			</View>
		);
	};

	renderFooter = () => {
		return (
			<TouchableOpacity style={styles.footerContainer}>
				<View style={styles.footerSeparator} />
				<View style={styles.addMemberContainer}>
					<Text style={styles.addMember}>{this.props.footerButton}</Text>
					<Icon name={"plus"} size={14} color={Colors.groups} />
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		const listTopPadding = this.props.cardHeight + this.props.statusBarHeight - 20;
		const scrollHeight = {
			paddingTop: this.props.statusBarHeight + 10,
			paddingBottom: 10,
			height: this.props.cardHeight + this.props.statusBarHeight + 20
		};

		let listStyle = {
			marginHorizontal: 20,
			paddingTop: listTopPadding,
			transform: [
				{
					translateY: this.entry.interpolate({
						inputRange: [0, 1],
						outputRange: [250, 0]
					})
				}
			],
			...shadow
		};

		return (
			<View style={styles.container}>
				<AnimatedFlatList
					style={listStyle}
					data={this.props.data}
					keyExtractor={this._keyExtractor}
					renderItem={this.props.renderItem}
					ListHeaderComponent={this.renderHeader}
					ListFooterComponent={this.renderFooter}
					ItemSeparatorComponent={this.renderSeparator}
				/>
				<ScrollView
					style={[styles.swipeContainer, scrollHeight]}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
				>
					<Page>
						<View style={[styles.moveContainer]}>{this.props.children}</View>
					</Page>
					<HalfPage>
						<View style={styles.options}>
							<TouchableOpacity style={styles.button}>
								<Text style={styles.leave}>{this.props.optionButton}</Text>
							</TouchableOpacity>
						</View>
					</HalfPage>
				</ScrollView>

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
	container: {
		flex: 1,
		backgroundColor: Colors.lightGray
		// ...shadow
	},
	swipeContainer: {
		position: "absolute",
		top: 0,
		right: 0,
		left: 0
	},
	moveContainer: {
		backgroundColor: "white",
		borderRadius: 15,
		position: "absolute",
		padding: 10,
		left: 10,
		right: 10,
		...heavyShadow
	},
	headerContainer: {
		flex: 1,
		paddingBottom: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	headerTitle: {
		color: Colors.groups,
		fontSize: 18,
		fontWeight: "900"
	},
	footerContainer: {
		flex: 1,
		paddingBottom: 10,
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		backgroundColor: "white"
	},
	footerSeparator: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: Colors.lightGray
	},
	separatorContainer: { width: SCREEN_WIDTH, borderRadius: 1, height: 1 },
	separatorBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: "white"
	},
	separator: {
		position: "absolute",
		top: 0,
		left: 50,
		right: 0,
		height: 1,
		backgroundColor: Colors.lightGray
	},
	addMemberContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 10
		// padding: 5
	},
	addMember: {
		color: Colors.groups,
		fontWeight: "900",
		marginRight: 5
	},
	options: {
		flex: 1,
		paddingRight: 10
	},
	button: {
		flex: 1,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.red,
		...shadow
	},
	leave: {
		fontSize: 18,
		color: Colors.lightGray
	},
	statusBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0
	}
};

export default Focus;
