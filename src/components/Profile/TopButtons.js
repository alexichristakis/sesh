import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import { BlurView } from "react-native-blur";

import ColorButton from "../global/ColorButton";

import { Colors } from "../../lib/styles";
import { SCREEN_WIDTH, BORDER_RADIUS } from "../../lib/constants";

const TopButtons = ({ onPressSettings, onPressAddFriend }) => {
	return (
		<SuperEllipseMask radius={BORDER_RADIUS} style={styles.container}>
			<ColorButton
				title={"Settings"}
				style={styles.button}
				borderRadius={BORDER_RADIUS}
				onPress={onPressSettings}
				color={Colors.gray}
			/>
			<ColorButton
				title={"Add Friends"}
				style={styles.button}
				borderRadius={BORDER_RADIUS}
				onPress={onPressAddFriend}
				color={Colors.gray}
			/>
		</SuperEllipseMask>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 5,
		backgroundColor: "white"
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		// paddingHorizontal: 47.5,
		// borderRadius: 20,
		borderWidth: 1,
		margin: 5
	}
});

export default TopButtons;
