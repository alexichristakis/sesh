import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import IonIcon from "react-native-vector-icons/Ionicons";
import AwesomeIcon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "react-native-blur";

import ColorButton from "../global/ColorButton";

import { Colors } from "../../lib/styles";
import { SCREEN_WIDTH, BORDER_RADIUS } from "../../lib/constants";

const TopButtons = ({
	onPressSettings,
	onPressAddFriend,
	onPressCreateGroup
}) => {
	return (
		<>
			<LinearGradient
				style={styles.shadow}
				locations={[0, 0.5, 1]}
				colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0)"]}
			/>
			<SuperEllipseMask radius={BORDER_RADIUS} style={styles.container}>
				<ColorButton
					title={<IonIcon name={"ios-settings"} size={24} />}
					subTitle={"Settings"}
					style={styles.button}
					onPress={onPressSettings}
					color={Colors.gray}
				/>
				<ColorButton
					title={<IonIcon name={"md-person-add"} size={24} />}
					subTitle={"Add Friends"}
					style={[styles.border, styles.button]}
					onPress={onPressAddFriend}
					color={Colors.gray}
				/>
				<ColorButton
					title={<AwesomeIcon name={"user-friends"} size={24} />}
					subTitle={"Create Group"}
					style={styles.button}
					onPress={onPressCreateGroup}
					color={Colors.gray}
				/>
			</SuperEllipseMask>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		// padding: 5,
		backgroundColor: "white"
	},
	shadow: {
		position: "absolute",
		width: SCREEN_WIDTH,
		height: 120,
		top: -40
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		borderRadius: 0
		// paddingHorizontal: 47.5,
		// borderWidth: 1,
		// margin: 5
	},
	border: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: Colors.mediumGray
	}
});

export default TopButtons;
