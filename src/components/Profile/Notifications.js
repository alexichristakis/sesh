import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import User from "../global/User";

import { BORDER_RADIUS } from "../../lib/constants";
import { TextStyles, SeparatorStyles } from "../../lib/styles";

const Notifications = ({ data, acceptFriend, deleteRequest }) => {
	_renderItem = ({ item }) => (
		<User request user={item} onPressAccept={acceptFriend} onPressDelete={deleteRequest} />
	);

	_renderSeparator = () => <View style={SeparatorStyles.users} />;

	_keyExtractor = item => item.uid.toString();

	if (data !== undefined && data.length !== 0) {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={TextStyles.headerWhite}>REQUESTS</Text>
				</View>
				<SuperEllipseMask radius={BORDER_RADIUS}>
					<FlatList
						scrollEnabled={false}
						style={styles.listBackground}
						data={data}
						renderItem={_renderItem}
						ItemSeparatorComponent={_renderSeparator}
						keyExtractor={_keyExtractor}
					/>
				</SuperEllipseMask>
			</View>
		);
	} else return <View />;
};

const styles = StyleSheet.create({
	container: { marginTop: 15 },
	listBackground: {
		backgroundColor: "white"
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		marginBottom: 5
	}
});

export default Notifications;
