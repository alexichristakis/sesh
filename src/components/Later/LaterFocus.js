import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import { Colors, shadow } from "../../lib/styles";

import Focus from "../global/Focus";
import User from "../global/User";
import LaterMove from "./LaterMove";

const data = [];

class LaterFocus extends Component {
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
				<LaterMove move={this.props.data} />
			</Focus>
		);
	}
}

export default LaterFocus;
