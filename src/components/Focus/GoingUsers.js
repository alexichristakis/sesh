import React, { Component } from "react";
import { StyleSheet, ScrollView, FlatList, View, Text } from "react-native";

import _ from "lodash";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import { BlurView } from "react-native-blur";

import TouchableScale from "../global/TouchableScale";
import MapCard from "../global/MapCard";
import User from "../global/User";
import LoadingCircle from "../global/LoadingCircle";

import {
	SCREEN_WIDTH,
	SCREEN_HEIGHT,
	SB_HEIGHT,
	BORDER_RADIUS,
	CARD_GUTTER
} from "../../lib/constants";
import { TextStyles } from "../../lib/styles";

const GoingUsers = ({ users }) => {
	// renderUser = ({ item }) => (
	// 	<SuperEllipseMask style={styles.goingContainer} radius={BORDER_RADIUS}>
	// 		<User user={item} />
	// 	</SuperEllipseMask>
	// );

	// renderSeparator = () => <View style={styles.separator} />;

	//	_keyExtractor = item => item.uid;

	if (users.length === 0) return <LoadingCircle style={styles.loading} size={20} />;
	else
		return (
			<>
				<Text style={[styles.header, TextStyles.headerWhite]}>GOING</Text>
				{users.map(user => (
					<SuperEllipseMask style={styles.goingContainer} radius={BORDER_RADIUS}>
						<User user={user} />
					</SuperEllipseMask>
				))}
			</>
		);
};

/*

			{users.map(user => (
					<SuperEllipseMask style={styles.goingContainer} radius={BORDER_RADIUS}>
						<User user={user} />
					</SuperEllipseMask>
				))}

<FlatList
						data={users}
						renderItem={renderUser}
						ItemSeparatorComponent={renderSeparator}
						keyExtractor={_keyExtractor}
					/>

					*/

const styles = StyleSheet.create({
	header: {
		paddingTop: 10,
		paddingLeft: 10
	},
	loading: {
		alignSelf: "center",
		marginTop: 50
	},
	goingContainer: {
		// flex: 1,
		// width: 500,
		// height: 500,
		backgroundColor: "white",
		marginTop: CARD_GUTTER
		// paddingBottom: 400
	}
});

export default GoingUsers;
