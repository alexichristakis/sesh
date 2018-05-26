import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import { Colors, shadow } from "../../lib/styles";

import Focus from "../global/Focus";
import User from "../global/User";
import CurrentMove from "./CurrentMove";

const data = [
	{
		id: "1",
		name: "Alexi Christakis",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "2",
		name: "William Oles",
		size: 105,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "3",
		name: "Michelle Li",
		size: 6,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "4",
		name: "Janvi Trivedi",
		size: 63,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "5",
		name: "Max Golden",
		size: 105,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "6",
		name: "Laszlo Gendler",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	}
];

class CurrentlyFocus extends Component {
	onPressPop = () => {
		this.focus.exit();
		setTimeout(() => {
			Navigation.pop(this.props.componentId, {
				customTransition: {
					animations: [],
					duration: 0
				}
			});
			this.props.closeCard();
		}, 20);
	};

	_renderItem = ({ item }) => <User data={item} />;

	render() {
		return (
			<Focus
				ref={item => (this.focus = item)}
				data={data}
				cardHeight={this.props.cardHeight}
				statusBarHeight={this.props.statusBarHeight}
				closeCard={this.props.closeCard}
				onPressPop={this.onPressPop}
				renderItem={this._renderItem}
			>
				<CurrentMove move={this.props.data} />
			</Focus>
		);
	}
}

export default CurrentlyFocus;
