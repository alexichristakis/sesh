import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import { Colors } from "../../lib/styles";

import CurrentMove from "./CurrentMove";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";
import Transition from "../global/Transition";

const data = [
	{
		id: "alexi1",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
	},
	{
		id: "alexi2",
		name: "Everest Fang",
		group: "Fence Club",
		time: 1526599742850,
		description: "just a chill sesh",
		location: "380 Crown – 0.76mi",
		photo: "https://graph.facebook.com/100004662791911/picture?type=large"
	},
	{
		id: "alexi3",
		name: "Alexi Christakis",
		group: "Splash Bros",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
	},
	{
		id: "alexi4",
		name: "William Oles",
		group: "Pierson Fam",
		time: 1526598742850,
		description: "lunch anyone?",
		location: "Morse College – 0.44mi",
		photo: "https://graph.facebook.com/100000731179223/picture?type=large"
	},
	{
		id: "alexi5",
		name: "Max Golden",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1182281483/picture?type=large"
	},
	{
		id: "alexi6",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
	},
	{
		id: "alexi7",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
	}
];

class Currently extends Component {
	constructor(props) {
		super(props);

		this.state = {
			source: {},
			sharedData: {},
			onReturn: null,
			MoveComponent: null
		};
	}

	transitionFrom = (source, onReturn, sharedData, MoveComponent) => {
		this.setState({ source, onReturn, sharedData, MoveComponent: MoveComponent });
	};

	transitionFinished = (source, sharedData) => {
		this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
	};

	_renderItem = ({ item, index }) => (
		<CardWrapper index={index} data={item} transitionFrom={this.transitionFrom}>
			<CurrentMove move={item} />
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
					destinationPage={"sesh.CurrentlyFocus"}
					MoveComponent={this.state.MoveComponent}
					transitionFinished={this.transitionFinished}
					onReturn={this.state.onReturn}
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

export default Currently;
