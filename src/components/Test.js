import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import { Colors, shadow } from "../lib/styles";
import { TimeAgo } from "../lib/functions";

import BackButton from "./global/BackButton";
import CurrentMove from "./Currently/CurrentMove";

class Test extends Component {
	onPressPop = () => {
		Navigation.pop(this.props.componentId, {
			customTransition: {
				animations: [],
				duration: 0.5,
			},
		});
		console.log(this.props);
		this.props.closeCard();
	};

	render() {
		// let Card = this.props.card;
		console.log(this.props.move);
		return (
			<View style={{ flex: 1, backgroundColor: Colors.lightGray }}>
				<View style={[styles.moveContainer, { top: this.props.statusBarHeight + 10 }]}>
					<CurrentMove move={this.props.move} />
				</View>
				<BackButton onPressPop={this.onPressPop} />
			</View>
		);
	}
}

const styles = {
	moveContainer: {
		backgroundColor: "white",
		borderRadius: 15,
		position: "absolute",
		padding: 15,
		left: 10,
		right: 10,
		...shadow,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		justifyContent: "center",
	},
};

export default Test;
