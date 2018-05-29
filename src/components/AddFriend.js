import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";

import BackButton from "./global/BackButton";
import Test from "./Test";

class AddFriend extends Component {
	render() {
		return (
			<View style={{ flex: 1, padding: 50 }}>
				<Text>this is the add friend page!</Text>
				<Test />
				<BackButton onPressPop={() => Navigation.dismissModal(this.props.componentId)} />
			</View>
		);
	}
}

export default AddFriend;
