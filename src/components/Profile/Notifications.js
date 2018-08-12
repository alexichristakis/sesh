import React from "react";
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import ColorButton from "../global/ColorButton";
import User from "../global/User";

import { SCREEN_WIDTH, BORDER_RADIUS } from "../../lib/constants";
import { Colors, TextStyles, SeparatorStyles } from "../../lib/styles";

const Notifications = props => {
	console.log(props);

	// _renderItem = ({ item, index }) => (
	// 	<View style={styles.notificationContainer}>
	// 		<Text style={{ ...TextStyles.body, flex: 1 }}>{item.name}</Text>
	// 		<ColorButton
	// 			title="Accept"
	// 			style={styles.button}
	// 			borderRadius={BORDER_RADIUS}
	// 			onPress={() => props.acceptFriend(item.uid)}
	// 			color={Colors.green}
	// 		/>
	// 		<ColorButton
	// 			title="Delete"
	// 			style={styles.button}
	// 			borderRadius={BORDER_RADIUS}
	// 			onPress={() => props.deleteRequest(item.uid)}
	// 			color={Colors.red}
	// 		/>
	// 	</View>
	// );

	_renderItem = ({ item }) => (
		<User
			request
			user={item}
			onPressAccept={props.acceptFriend}
			onPressDelete={props.deleteRequest}
		/>
	);

	_renderSeparator = () => <View style={SeparatorStyles.users} />;

	_keyExtractor = item => item.uid.toString();

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={TextStyles.headerWhite}>Requests:</Text>
			</View>
			<SuperEllipseMask radius={BORDER_RADIUS}>
				<FlatList
					scrollEnabled={false}
					style={styles.listBackground}
					data={props.data}
					renderItem={_renderItem}
					ItemSeparatorComponent={_renderSeparator}
					keyExtractor={_keyExtractor}
				/>
			</SuperEllipseMask>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { marginTop: 15 },
	listBackground: {
		backgroundColor: "white"
	},
	separator: {
		width: SCREEN_WIDTH - 24.5,
		marginLeft: 24.5,
		height: 1,
		backgroundColor: Colors.lightGray
	},
	notificationContainer: {
		flexDirection: "row",
		padding: 10,
		paddingLeft: 20,
		alignItems: "center"
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		marginBottom: 5
	},
	header: {
		fontSize: 22,
		color: "white",
		// color: Colors.gray,
		fontWeight: "bold"
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		marginHorizontal: 2.5
	}
});

export default Notifications;
