import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { Navigation } from "react-native-navigation";

import { Colors, shadow } from "../../lib/styles";

import Focus from "../global/Focus";
import User from "../global/User";
import Group from "./Group";

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

class GroupFocus extends Component {
	onPressPop = () => {
		this.focus.exit();
		setTimeout(() => {
			Navigation.pop(this.props.componentId, {
				customTransition: {
					animations: [],
					duration: 0.1
				}
			});
			this.props.closeCard();
		}, 20);
	};

	onPressPresentModalTo = () => {
		Navigation.showModal({
			component: {
				name: "sesh.AddToGroup",
				passProps: this.props.data
			}
		});
	};

	_renderItem = ({ item, index }) => <User length={data.length} index={index} data={item} />;

	_renderHeader = () => {
		return (
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>Members:</Text>
			</View>
		);
	};

	_renderFooter = () => {
		return (
			<TouchableOpacity style={styles.footerContainer} onPress={this.onPressPresentModalTo}>
				<View style={styles.footerSeparator} />
				<View style={styles.addMemberContainer}>
					<Text style={styles.addMember}>add member</Text>
					<Icon name={"plus"} size={14} color={Colors.groups} />
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		return (
			<Focus
				ref={item => (this.focus = item)}
				data={data}
				renderHeader={this._renderHeader}
				renderFooter={this._renderFooter}
				optionButton={"leave group"}
				cardHeight={this.props.cardHeight}
				statusBarHeight={this.props.statusBarHeight}
				closeCard={this.props.closeCard}
				onPressPop={this.onPressPop}
				renderItem={this._renderItem}
			>
				<Group data={this.props.data} />
			</Focus>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		paddingBottom: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	headerTitle: {
		color: Colors.groups,
		fontSize: 18,
		fontWeight: "900"
	},
	footerContainer: {
		flex: 1,
		paddingBottom: 10,
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		backgroundColor: "white"
	},
	footerSeparator: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: Colors.lightGray
	},
	addMemberContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 10
		// padding: 5
	},
	addMember: {
		color: Colors.groups,
		fontWeight: "900",
		marginRight: 5
	}
});

export default GroupFocus;
