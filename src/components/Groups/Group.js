import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import RNFS from "react-native-fs";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow, cardShadow } from "../../lib/styles";

const ICON_SIZE1 = 35;
const ICON_SIZE2 = 30;

class Group extends Component {
	constructor(props) {
		super(props);

		this.state = {
			photo: RNFS.DocumentDirectoryPath + "/profile_pic.png",
			editing: false,
			loading: true,
			groupName: this.props.data.name,
			newName: "",
		};
	}

	componentDidMount() {
		// const path = RNFS.DocumentDirectoryPath + "/profile_pic.png";
		// RNFS.readFile(path, "base64").then(res => {
		// 	this.setState({ photo: "data:image/png;base64," + res, loading: false });
		// });
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

		let cardStyle = {
			backgroundColor: "rgba(255,255,255,0.5)",
			borderRadius: 15,
			overflow: "hidden",
		};

		return (
			<View style={[styles.container, this.props.card ? cardStyle : {}]}>
				{/* {this.props.card && <View style={styles.background} />} */}
				{this.props.card && <BlurView blurType={"xlight"} style={styles.blur} />}
				<View style={styles.pictures}>
					<Image style={styles.image1} source={{ uri: this.state.photo }} />
					<Image style={styles.image2} source={{ uri: this.state.photo }} />
					<Image style={styles.image3} source={{ uri: this.state.photo }} />
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
								placeholderTextColor={this.state.editing ? Colors.gray : "black"}
							/>
						)}
						{this.props.editName && (
							<FeatherIcon
								style={{ paddingLeft: 5 }}
								name={"edit-2"}
								size={12}
								color={Colors.groups}
							/>
						)}
					</View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={styles.size}>{group.size} members</Text>
						<EntypoIcon
							style={{ paddingTop: 2 }}
							name={"dot-single"}
							size={14}
							color={Colors.gray}
						/>
						<Text style={styles.time}>{TimeAgo(group.time)}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "white",
		// opacity: 0.2
	},
	blur: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	container: {
		// flex: 1,
		flexDirection: "row",
		alignItems: "center",
		// backgroundColor: "transparent",
		// backgroundColor: "white",
		// marginHorizontal: 10,
		// borderWidth: 20,
		// borderColor: Colors.primary,
		overflow: "hidden",
		padding: 10,
		paddingRight: 12,
		// ...shadow
	},
	blur: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	blank: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "white",
	},
	pictures: {
		flexDirection: "row",
		flex: 1,
		marginRight: 12,
	},
	image1: {
		position: "absolute",
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE2 / 2,
		height: ICON_SIZE2,
		width: ICON_SIZE2,
	},
	image2: {
		position: "absolute",
		marginLeft: ICON_SIZE2,
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE2 / 2,
		height: ICON_SIZE2,
		width: ICON_SIZE2,
	},
	image3: {
		position: "absolute",
		marginLeft: ICON_SIZE2 / 2,
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE1 / 2,
		height: ICON_SIZE1,
		width: ICON_SIZE1,
	},
	mid: {
		flex: 5,
		// marginLeft: 10,
	},
	name: {
		fontSize: 24,
		fontWeight: "300",
		// color: "white"
	},
	size: {
		fontSize: 14,
		fontWeight: "300",
		color: Colors.gray,
	},
	time: {
		fontSize: 14,
		fontWeight: "800",
		color: Colors.gray,
	},
});

export default Group;
