import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";

import BackButton from "../global/BackButton";

class CreateLaterMove extends Component {
	render() {
		return (
			<View style={{ flex: 1, padding: 50 }}>
				<Text>this is the create later move page!</Text>
				<BackButton onPressPop={() => Navigation.dismissModal(this.props.componentId)} />
			</View>
		);
	}
}

export default CreateLaterMove;
