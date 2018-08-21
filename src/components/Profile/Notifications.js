import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import User from "../global/User";

import { BORDER_RADIUS, CARD_GUTTER } from "../../lib/constants";
import { TextStyles, SeparatorStyles } from "../../lib/styles";

const Notifications = ({ data, acceptFriend, deleteRequest }) => {
	renderRequest = ({ item }) => (
		<User request user={item} onPressAccept={acceptFriend} onPressDelete={deleteRequest} />
	);

	_renderSeparator = () => <View style={SeparatorStyles.users} />;

	_keyExtractor = item => item.uid.toString();

	if (data !== undefined && data.length !== 0) {
		return (
			<>
				<Text style={TextStyles.headerWhite}>REQUESTS</Text>
				<SuperEllipseMask style={{ marginTop: CARD_GUTTER }} radius={BORDER_RADIUS}>
					<FlatList
						scrollEnabled={false}
						style={styles.listBackground}
						data={data}
						renderItem={renderRequest}
						ItemSeparatorComponent={_renderSeparator}
						keyExtractor={_keyExtractor}
					/>
				</SuperEllipseMask>
			</>
		);
	} else return <View />;
};

const styles = StyleSheet.create({
	// container: { marginTop: 15 },
	listBackground: {
		backgroundColor: "white"
	}
});

export default Notifications;
