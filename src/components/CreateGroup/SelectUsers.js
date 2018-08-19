import React, { Component } from "react";
import { View, FlatList, TouchableHighlight } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import User from "../global/User";

import { CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";
import { SeparatorStyles, Colors } from "../../lib/styles";

class SelectUsers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: []
		};
	}

	renderUser = ({ item, index }) => {
		return (
			<TouchableHighlight
				style={{ flex: 1 }}
				activeOpacity={0.8}
				underlayColor={Colors.mediumGray}
				onPress={() => this.handleOnPressUser(item)}
			>
				<User selectable selected={this.isSelected(item)} user={item} />
			</TouchableHighlight>
		);
	};

	renderSeparator = () => <View style={SeparatorStyles.users} />;

	_keyExtractor = item => item.uid.toString();

	isSelected = ({ uid }) => {
		const { selected } = this.state;
		if (selected.includes(uid)) return true;
		else return false;
	};

	handleOnPressUser = ({ uid }) => {
		const { selected } = this.state;
		if (selected.includes(uid)) {
			this.setState(
				{
					selected: selected.filter(i => i != uid)
				},
				() => this.props.onSelect(this.state.selected)
			);
		} else {
			this.setState(
				{
					selected: [...selected, uid]
				},
				() => this.props.onSelect(this.state.selected)
			);
		}
	};

	render() {
		const { friends } = this.props;
		console.log(this.state.selected);
		return (
			<SuperEllipseMask
				style={{ marginVertical: CARD_GUTTER, backgroundColor: "white" }}
				radius={BORDER_RADIUS}
			>
				<FlatList
					scrollEnabled={false}
					style={{ flex: 1 }}
					data={friends}
					keyExtractor={this._keyExtractor}
					ItemSeparatorComponent={this.renderSeparator}
					renderItem={this.renderUser}
				/>
			</SuperEllipseMask>
		);
	}
}

export default SelectUsers;
