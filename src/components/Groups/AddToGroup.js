import React, { Component } from "react";
import { StyleSheet, Keyboard, View, Text, FlatList, TextInput, Image } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import { Navigation } from "react-native-navigation";

import BackButton from "../global/BackButton";
import SearchResult from "../global/SearchResult";

import query from "~/lib/query";
import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "~/lib/constants";
import { Colors, shadow } from "~/lib/styles";

const friends = [
	{
		uid: 1,
		name: "Alexi Christakis"
	},
	{
		uid: 2,
		name: "Ariana Christakis"
	},
	{
		uid: 3,
		name: "Alexander Sikorski"
	},
	{
		uid: 4,
		name: "William Oles"
	},
	{
		uid: 5,
		name: "William Galligan"
	},
	{
		uid: 6,
		name: "Max Golden"
	},
	{
		uid: 7,
		name: "Janvi Trivedi"
	},
	{
		uid: 8,
		name: "Michelle Li"
	},
	{
		uid: 9,
		name: "Lena Christakis"
	}
];

class AddToGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searched: "",
			results: friends
		};
	}

	search = searched => {
		this.setState({ searched });
		var res = query("name")
			.startsWith(searched)
			.on(friends);
		console.log(res);
		this.setState({ results: res });
	};

	_renderItem = ({ item }) => <SearchResult data={item} />;

	_keyExtractor = item => item.uid.toString();

	// renderSeparator = () => {
	// 	return <View style={styles.separator} />;
	// };
	renderSeparator = () => {
		const separatorHeight = 1;
		return (
			<View style={styles.separatorContainer}>
				<View style={styles.separator} />
			</View>
		);
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: Colors.lightGray }}>
				<FlatList
					keyboardShouldPersistTaps="handled"
					style={{ flex: 1, paddingTop: 40, marginLeft: 20 }}
					data={this.state.results}
					keyExtractor={this._keyExtractor}
					ItemSeparatorComponent={this.renderSeparator}
					renderItem={this._renderItem}
				/>
				<VibrancyView style={{ position: "absolute", top: 0, left: 0, right: 0 }} blurType="xlight">
					<TextInput
						style={styles.input}
						autoFocus
						autoCapitalize={"words"}
						placeholder={"name"}
						placeholderTextColor={Colors.gray}
						onChangeText={searched => this.search(searched)}
					/>
				</VibrancyView>

				<BackButton
					onPressPop={() => {
						Keyboard.dismiss();
						Navigation.dismissModal(this.props.componentId);
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	separatorContainer: { width: SCREEN_WIDTH, borderRadius: 2, overflow: "hidden", height: 1 },
	separator: {
		position: "absolute",
		top: 0,
		left: 50,
		right: 0,
		height: 1,
		backgroundColor: Colors.mediumGray
	},
	input: {
		flex: 1,
		paddingBottom: 10,
		paddingTop: SB_HEIGHT,
		paddingHorizontal: 20,
		fontSize: 28,
		fontWeight: "900"
	}
});

export default AddToGroup;
