import React, { Component } from "react";
import {
	LayoutAnimation,
	Easing,
	Animated,
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import { Navigation } from "react-native-navigation";
// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

const ICON_SIZE = 35;

class User extends Component {
	constructor(props) {
		super(props);

		this.animated = new Animated.Value(1);
	}

	handlePressIn = () => {
		Animated.spring(this.animated, {
			toValue: 0.95,
			useNativeDriver: true
		}).start();
	};

	handlePressOut = () => {
		Animated.spring(this.animated, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true
		}).start();
	};

	render() {
		const user = this.props.data;

		const maxIndex = this.props.length - 1;
		let containerAdditionalStyle = {
			borderTopLeftRadius: this.props.index === 0 ? 15 : 0,
			borderTopRightRadius: this.props.index === 0 ? 15 : 0,
			// borderBottomLeftRadius: this.props.index === maxIndex ? 15 : 0,
			// borderBottomRightRadius: this.props.index === maxIndex ? 15 : 0,
			transform: [
				{
					scale: this.animated
				}
			]
		};

		return (
			<Animated.View
				ref={item => (this.view = item)}
				style={[styles.container, containerAdditionalStyle]}
			>
				<TouchableOpacity
					// activeOpacity={0.8}
					style={{ flex: 1, flexDirection: "row" }}
					// onPressIn={this.handlePressIn}
					// onPressOut={this.handlePressOut}
					onPress={() => {
						// ReactNativeHapticFeedback.trigger("impactLight");
						console.log(this.props.index);
					}}
				>
					<Image style={styles.image} source={{ uri: user.photo }} />
					<Text style={styles.name}>{user.name}</Text>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		justifyContent: "center",
		padding: 5
		// ...shadow
	},
	image: {
		// position: "absolute",
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE / 2,
		height: ICON_SIZE,
		width: ICON_SIZE
	},
	name: {
		flex: 1,
		marginLeft: 10,
		alignSelf: "center",
		fontSize: 20,
		fontWeight: "900"
		// color: Colors.currently,
	},

	time: {
		alignSelf: "center",
		fontSize: 12,
		fontWeight: "300",
		color: Colors.gray
	}
});

export default User;
