import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import { Colors } from "../../lib/styles";

import LaterMove from "./LaterMove";
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
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "alexi2",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "alexi3",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "alexi4",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "alexi5",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "alexi6",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1825693684117541/picture"
	},
	{
		id: "alexi7",
		name: "Alexi Christakis",
		group: "9pack",
		time: 1526598742850,
		description: "suite dinner in pierson!",
		location: "Pierson College – 0.24mi",
		photo: "https://graph.facebook.com/1825693684117541/picture"
	}
];

class Later extends Component {
	constructor(props) {
		super(props);

		this.state = {
			joinedMoves: [],
			MoveComponent: null
		};
	}

	transitionFrom = (source, onReturn, data, MoveComponent) => {
		let joined = this.state.joinedMoves.includes(data.id);
		this.setState({ MoveComponent: MoveComponent });
		this.transition.openCard(source, onReturn, data, {
			joined: joined,
			joinMove: this.joinMove,
			leaveMove: this.leaveMove
		});
	};

	transitionFinished = (source, sharedData) => {
		// this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
	};

	_renderItem = ({ item, index }) => (
		<CardWrapper index={index} data={item} transitionFrom={this.transitionFrom}>
			<LaterMove move={item} />
		</CardWrapper>
	);

	joinMove = move => {
		if (!this.state.joinedMoves.includes(move)) {
			this.setState({ joinedMoves: [...this.state.joinedMoves, move] });
			// make api call
		}
	};

	leaveMove = move => {
		if (this.state.joinedMoves.includes(move)) {
			let index = this.state.joinedMoves.indexOf(move);
			this.setState({
				joinedMoves: [
					...this.state.joinedMoves.slice(0, index),
					...this.state.joinedMoves.slice(index + 1)
				]
			});
			// make api call
		}
	};

	render() {
		const { openProgress } = this.state;
		return (
			<View style={{ flex: 1 }}>
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
					destinationPage={"sesh.LaterFocus"}
					transitionFinished={this.transitionFinished}
					clearScreen={this.props.clearScreen}
					returnScreen={this.props.returnScreen}
					onPressPushTo={this.props.onPressPushTo}
					MoveComponent={this.state.MoveComponent}
				/>
			</View>
		);
	}
}

export default Later;
