import React, { Component } from "react";
import {
	LayoutAnimation,
	Easing,
	Animated,
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Icon from "react-native-vector-icons/Feather";

import Checkmark from "./Checkmark";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

const ICON_SIZE = 35;

class SearchResult extends Component {
	constructor(props) {
		super(props);

		this.state = {
			added: false
		};
	}

	render() {
		const user = this.props.data;

		const maxIndex = this.props.length - 1;

		return (
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					ReactNativeHapticFeedback.trigger("impactLight");
					this.setState({ added: !this.state.added });
					console.log(this.props.index);
				}}
			>
				<Image style={styles.image} source={{ uri: user.photo }} />
				<Text style={styles.name}>{user.name}</Text>
				{!this.state.added && <Icon name={"plus"} size={20} color={Colors.primary} />}
				{this.state.added && <Checkmark style={{ marginRight: 5 }} size={8} />}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10
	},
	image: {
		// position: "absolute",
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE / 2,
		height: ICON_SIZE,
		width: ICON_SIZE
	},
	name: {
		flex: 1,
		marginLeft: 10,
		alignSelf: "center",
		fontSize: 20,
		fontWeight: "900"
		// color: Colors.currently,
	},

	time: {
		alignSelf: "center",
		fontSize: 12,
		fontWeight: "300",
		color: Colors.gray
	}
});

export default SearchResult;
