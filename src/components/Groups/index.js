import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

import { SCREEN_WIDTH, SB_HEIGHT } from "../../lib/constants";
import { Colors } from "../../lib/styles";

import Group from "./Group";
import Background from "../global/Background";
import TouchableScale from "../global/TouchableScale";
import BackButton from "../global/BackButton";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";
import Transition from "../global/Transition";

const DATA = [
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
	{
		id: "7",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
	{
		id: "8",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
	{
		id: "9",
		name: "9pack",
		size: 9,
		time: 1526598742850,
		photo: "https://graph.facebook.com/1825693684117541/picture",
	},
	{
		id: "10",
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
			data: DATA,
		};
	}

	_keyExtractor = item => item.id.toString();

	_renderItem = ({ item, index }) => (
		<TouchableScale
			onPress={() =>
				this.props.presentOverlay("sesh.GroupFocus", {
					data: item,
					changeName: this.changeGroupName,
				})
			}>
			<Group index={index} data={item} />
		</TouchableScale>
	);

	_renderSeparator = () => <View style={styles.separator} />;

	_renderHeader = () => (
		<View style={styles.headerContainer}>
			<Text style={styles.header}>Groups</Text>
			<TouchableScale onPress={() => console.log("hi")}>
				<Icon name={"plus"} size={30} color={Colors.primary} />
			</TouchableScale>
		</View>
	);

	changeGroupName = (oldData, newName) => {
		console.log("changing!!");
		const newData = { ...oldData, name: newName };
		// this.setState({ MoveComponent: <Group data={newData} /> });
		console.log(newData);
		const data = this.state.data;
		console.log(data);
		data.forEach(group => {
			console.log(group);
			if (group.id === newData.id) {
				console.log("setting new state");
				group.name = newData.name;
				this.setState({ data: data });
				// break;
			}
		});
	};

	render() {
		return (
			<Background>
				<FlatList
					style={styles.container}
					data={this.state.data}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
					ItemSeparatorComponent={this._renderSeparator}
					ListHeaderComponent={this._renderHeader}
				/>

				<BlurView blurType="xlight" style={styles.statusBar} />
				<BackButton onPressPop={() => Navigation.dismissModal(this.props.componentId)} />
			</Background>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: 40
	},
	headerContainer: {
		flexDirection: "row",
		paddingHorizontal: 15,
		justifyContent: "space-between",
		alignItems: "center",
	},
	header: {
		// paddingTop: SB_HEIGHT,
		paddingBottom: 10,
		// color: "white",
		fontSize: 28,
		fontWeight: "800",
	},
	separator: {
		width: SCREEN_WIDTH - 80,
		marginLeft: 80,
		height: 1.5,
		backgroundColor: Colors.mediumGray,
	},
	statusBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: SB_HEIGHT,
	},
});

export default Groups;
