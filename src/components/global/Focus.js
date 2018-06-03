import React, { Component } from "react";
import {
	Animated,
	Easing,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	Image,
	FlatList,
} from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";

import TouchableScale from "./TouchableScale";
import BackButton from "./BackButton";
import Background from "./Background";
import MapCard from "./MapCard";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../../lib/constants";
import { Colors, heavyShadow, shadow } from "../../lib/styles";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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

	componentDidMount() {
		Animated.timing(this.entry, {
			toValue: 1,
			duration: 200,
			// easing: Easing.poly(0.25),
			easing: Easing.in(Easing.poly(0.25)),
			useNativeDriver: true,
		}).start();
	}

	exit = () => {
		Animated.timing(this.entry, {
			toValue: 0,
			duration: 100,
			// easing: Easing.poly(2),
			easing: Easing.out(Easing.poly(0.25)),
			useNativeDriver: true,
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

	render() {
		const { cardHeight } = this.props;
		// const listTopPadding = cardHeight + SB_HEIGHT - (SB_HEIGHT === 40 ? 20 : 0);
		const listTopPadding = cardHeight + SB_HEIGHT - 20;

		const scrollHeight = {
			paddingTop: SB_HEIGHT + 10,
			paddingBottom: 10,
			height: cardHeight + SB_HEIGHT + 20,
		};

		let listStyle = {
			// position: "absolute",
			// top: 0,
			// bottom: 0,
			// // left: 1
			paddingHorizontal: 20,
			paddingTop: listTopPadding,
			transform: [
				{
					translateY: this.entry.interpolate({
						inputRange: [0, 1],
						outputRange: [250, 0],
					}),
				},
			],
		};

		return (
			<Background>
				<AnimatedFlatList
					style={listStyle}
					data={this.props.data}
					keyExtractor={this._keyExtractor}
					renderItem={this.props.renderItem}
					ListHeaderComponent={this.props.renderHeader}
					ListFooterComponent={this.props.renderFooter}
					ItemSeparatorComponent={this.renderSeparator}
				/>

				<ScrollView
					style={[styles.swipeContainer, scrollHeight]}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}>
					<Page>
						<TouchableScale onPress={this.props.onPressPop} style={styles.moveContainer}>
							{this.props.children}
						</TouchableScale>
					</Page>
					<HalfPage>
						<View style={styles.options}>
							<TouchableOpacity style={styles.button}>
								<Text style={styles.leave}>{this.props.optionButton}</Text>
							</TouchableOpacity>
						</View>
					</HalfPage>
				</ScrollView>

				<BackButton list onPressPop={this.props.onPressPop} />
				<BlurView blurType="xlight" style={styles.statusBar} />
			</Background>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		// ...shadow
	},
	swipeContainer: {
		position: "absolute",
		top: 0,
		right: 0,
		left: 0,
	},
	moveContainer: {
		// backgroundColor: "white",
		// borderRadius: 15,
		position: "absolute",
		// padding: 10,
		// paddingRight: 12,
		left: 10,
		right: 10,
		// left: 0,
		// right: 0,
		// ...shadow
		// ...heavyShadow
	},
	separatorContainer: { width: SCREEN_WIDTH, borderRadius: 1, height: 1 },
	separatorBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: "white",
	},
	separator: {
		position: "absolute",
		top: 0,
		left: 50,
		right: 0,
		height: 1,
		backgroundColor: Colors.lightGray,
	},
	options: {
		flex: 1,
		paddingRight: 10,
	},
	button: {
		flex: 1,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.red,
		...shadow,
	},
	leave: {
		fontSize: 18,
		color: Colors.lightGray,
	},
	statusBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: SB_HEIGHT,
	},
});

export default Focus;
