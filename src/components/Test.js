import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import MapView from "react-native-maps";

import { Colors, shadow } from "../lib/styles";

import BackButton from "./global/BackButton";

class Test extends Component {
	render() {
		// let Card = this.props.card;
		console.log(this.props.move);
		return (
			<View style={{ flex: 1, backgroundColor: Colors.lightGray }}>
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				/>
				{/* <BackButton onPressPop={this.onPressPop} /> */}
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
		...shadow
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		justifyContent: "center"
	}
};

export default Test;
