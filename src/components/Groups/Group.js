import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

const ICON_SIZE1 = 35;
const ICON_SIZE2 = 30;

class Group extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editing: false,
			groupName: this.props.data.name,
			newName: ""
		};
	}

	onChangeText = text => {
		this.setState({ newName: text });
	};

	onFocus = () => {
		this.setState({ editing: true });
	};

	onEndEditing = () => {
		this.setState({ editing: false });
		const currentName = this.state.groupName;
		const newName = this.state.newName;
		if (newName.length > 0 && newName !== currentName) {
			this.setState({ groupName: newName, newName: "" });
			this.props.updateName(this.props.data.id, newName);
		}
	};

	render() {
		const group = this.props.data;

		return (
			<View style={styles.container}>
				<View style={styles.pictures}>
					<Image style={styles.image1} source={{ uri: group.photo }} />
					<Image style={styles.image2} source={{ uri: group.photo }} />
					<Image style={styles.image3} source={{ uri: group.photo }} />
				</View>
				<View style={styles.mid}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						{!this.props.editName && <Text style={styles.name}>{group.name}</Text>}
						{this.props.editName && (
							<TextInput
								ref={item => (this.input = item)}
								style={styles.name}
								onFocus={this.onFocus}
								onEndEditing={this.onEndEditing}
								onChangeText={text => this.onChangeText(text)}
								placeholder={this.state.groupName}
								placeholderTextColor={this.state.editing ? Colors.mediumGray : "black"}
							/>
						)}
						{this.props.editName && (
							<Icon style={{ paddingLeft: 10 }} name={"edit"} size={18} color={Colors.groups} />
						)}
					</View>

					<Text style={styles.size}>{group.size} members</Text>
				</View>

				<Text style={styles.time}>{TimeAgo(group.time)}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	pictures: {
		flexDirection: "row",
		flex: 1.5
	},
	image1: {
		position: "absolute",
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE2 / 2,
		height: ICON_SIZE2,
		width: ICON_SIZE2
	},
	image2: {
		position: "absolute",
		marginLeft: ICON_SIZE2,
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE2 / 2,
		height: ICON_SIZE2,
		width: ICON_SIZE2
	},
	image3: {
		position: "absolute",
		marginLeft: ICON_SIZE2 / 2,
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE1 / 2,
		height: ICON_SIZE1,
		width: ICON_SIZE1
	},
	mid: {
		flex: 5,
		marginLeft: 4
	},
	name: {
		fontSize: 24,
		fontWeight: "900"
		// color: Colors.currently,
	},
	size: {
		fontSize: 12,
		fontWeight: "300",
		color: Colors.gray
	},
	time: {
		fontSize: 12,
		fontWeight: "300",
		color: Colors.groups
	}
});

export default Group;
