import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import { Colors } from "../../lib/styles";

import Group from "./Group";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";
import Transition from "../global/Transition";

const data = [
	{
		id: "1",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "2",
		name: "Fence Club",
		size: 105,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "3",
		name: "Splash Bros",
		size: 6,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "4",
		name: "Frisbee",
		size: 63,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "5",
		name: "Fence Club",
		size: 105,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "6",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	}
];

class Groups extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	transitionFrom = (source, onReturn, data, MoveComponent) => {
		this.transition.openCard(source, onReturn, data, MoveComponent, {});
	};

	transitionFinished = (source, sharedData) => {
		// this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
	};

	_renderItem = ({ item, index }) => (
		<CardWrapper index={index} data={item} transitionFrom={this.transitionFrom}>
			<Group data={item} />
		</CardWrapper>
	);

	render() {
		return (
			<View style={{ flex: 1 }}>
				<VerticalList
					ref={item => (this.list = item)}
					data={data}
					renderItem={this._renderItem}
					onScroll={this.props._vertOnScroll}
					onScrollBeginDrag={this.props._onScrollBegin}
					onScrollEndDrag={this.props._onScrollEnd}
					statusBarHeight={this.props.statusBarHeight}
				/>
				<Transition
					ref={item => (this.transition = item)}
					destinationPage={"sesh.GroupFocus"}
					transitionFinished={this.transitionFinished}
					clearScreen={this.props.clearScreen}
					returnScreen={this.props.returnScreen}
					onPressPushTo={this.props.onPressPushTo}
					from={this.state.source}
					data={this.state.sharedData}
					statusBarHeight={this.props.statusBarHeight}
				/>
			</View>
		);
	}
}

export default Groups;
