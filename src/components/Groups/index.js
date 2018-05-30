import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

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
	},
	{
		id: "7",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "8",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "9",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "10",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture"
	}
];

// @subscribe()
class Groups extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sharedData: {},
			MoveComponent: null
		};
	}

	transitionFrom = (source, onReturn, data, MoveComponent) => {
		this.setState({ MoveComponent: MoveComponent, sharedData: data });
		this.transition.openCard(source, onReturn, data, { changeName: this.changeGroupName });
	};

	transitionFinished = (source, sharedData) => {
		// this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
	};

	_renderItem = ({ item, index }) => (
		<CardWrapper data={item} transitionFrom={this.transitionFrom}>
			<Group index={index} data={item} />
		</CardWrapper>
	);

	changeGroupName = newName => {
		const newData = { ...this.state.sharedData, name: newName };
		this.setState({ MoveComponent: <Group data={newData} /> });
		data.forEach(group => {
			if (group.id === newData.id) group.name = newData.name;
		});
	};

	render() {
		return (
			// <View style={{ flex: 1 }}>
			// <LinearGradient
			// 	// start={{ x: 0.0, y: 0.25 }}
			// 	// end={{ x: 0.5, y: 1.0 }}
			// 	locations={[0.8, 1]}
			// 	colors={[Colors.lightGray, Colors.groups]}
			// 	style={{ flex: 1 }}
			// >
			<View style={{ flex: 1, backgroundColor: "transparent" }}>
				<VerticalList
					ref={item => (this.list = item)}
					data={data}
					renderItem={this._renderItem}
					onScroll={this.props._vertOnScroll}
					onScrollBeginDrag={this.props._onScrollBegin}
					onScrollEndDrag={this.props._onScrollEnd}
				/>
				<Transition
					ref={item => (this.transition = item)}
					destinationPage={"sesh.GroupFocus"}
					transitionFinished={this.transitionFinished}
					clearScreen={this.props.clearScreen}
					returnScreen={this.props.returnScreen}
					onPressPushTo={this.props.onPressPushTo}
					MoveComponent={this.state.MoveComponent}
				/>
			</View>
			// </LinearGradient>
			// </View>
		);
	}
}

export default Groups;
