import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";
import PropTypes from "prop-types";

import { Colors } from "../../lib/styles";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class VerticalList extends Component {
	constructor(props) {
		super(props);

		// this.animatedPadding = new Animated.Value(105);
		this.animatedOpacity = new Animated.Value(1);
		this.animatedTranslate = new Animated.Value(1);
	}

	_keyExtractor = item => item.id.toString();

	fadeOut = () => {
		Animated.timing(this.animatedOpacity, {
			toValue: 0,
			duration: 500,
			easing: Easing.ease,
			useNativeDriver: true
		}).start();
	};

	fadeIn = () => {
		Animated.timing(this.animatedOpacity, {
			toValue: 1,
			duration: 500,
			easing: Easing.ease,
			useNativeDriver: true
		}).start();
	};

	shortenPadding = () => {
		Animated.timing(this.animatedTranslate, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start();
	};

	lengthenPadding = () => {
		Animated.timing(this.animatedTranslate, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start();
	};

	render() {
		let animatedStyle = {
			transform: [
				{
					translateY: this.animatedTranslate.interpolate({
						inputRange: [0, 1],
						outputRange: [-80, 0]
					})
				}
			],
			opacity: this.animatedOpacity
		};

		return (
			<AnimatedFlatList
				style={[styles.container, animatedStyle]}
				contentContainerStyle={styles.content}
				data={this.props.data}
				renderItem={this.props.renderItem}
				scrollEventThrottle={50}
				onScroll={this.props.onScroll}
				onScrollBeginDrag={this.props.onScrollBeginDrag}
				onScrollEndDrag={this.props.onScrollEndDrag}
				keyExtractor={this._keyExtractor}
				showsVerticalScrollIndicator={false}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: -80,
		paddingTop: 115,
		// paddingBottom: 70,
		// marginBottom: 35,
		backgroundColor: Colors.lightGray
	},
	content: {
		paddingBottom: 120
	}
});

VerticalList.propTypes = {
	data: PropTypes.array.isRequired,
	renderItem: PropTypes.func.isRequired,
	onScroll: PropTypes.func,
	onScrollBeginDrag: PropTypes.func,
	onScrollEndDrag: PropTypes.func
};

export default VerticalList;
