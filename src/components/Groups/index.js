import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import { Colors } from "../../lib/styles";

import VerticalList from "../VerticalList";
import Group from "./Group";
import CardWrapper from "../global/CardWrapper";
import Transition from "../global/Transition";

const data = [
	{
		id: "1",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
	{
		id: "2",
		name: "Fence Club",
		size: 105,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
	{
		id: "3",
		name: "Splash Bros",
		size: 6,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
	{
		id: "4",
		name: "Frisbee",
		size: 63,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
	{
		id: "5",
		name: "Fence Club",
		size: 105,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
	{
		id: "6",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
];

class Groups extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// transitioning: false,
			source: {},
			sharedData: {},
			MoveComponent: null,
		};
	}

	transitionFrom = (source, sharedData, MoveComponent) => {
		this.setState({ source, sharedData, MoveComponent: MoveComponent });
	};

	transitionFinished = (source, sharedData) => {
		this.setState({ source: {}, sharedData: {}, MoveComponent: null });
	};

	_renderItem = ({ item }) => (
		<CardWrapper
			card={<Group data={item} />}
			data={item}
			// photo={this.props.profilePic}
			transitionFrom={this.transitionFrom}
		/>
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
					destinationPage={"sesh.GroupFocus"}
					MoveComponent={this.state.MoveComponent}
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
