import React from "react";
import {
	StyleSheet,
	StatusBar,
	FlatList,
	View,
	Text,
	TouchableOpacity,
	TouchableHighlight
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import { Navigation } from "react-native-navigation";
import { VibrancyView } from "react-native-blur";

import User from "../global/User";

import { ShowAddFriend } from "../../lib/navigation";
import { SCREEN_WIDTH, CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";
import { Colors, TextStyles, SeparatorStyles } from "../../lib/styles";

const Friends = ({ friends }) => {
	console.log(friends);
	renderUser = ({ item, index }) => <User user={item} />;

	renderSeparator = () => <View style={SeparatorStyles.users} />;

	renderFooter = () => (
		<TouchableHighlight
			onPress={ShowAddFriend}
			underlayColor={Colors.mediumGray}
			style={styles.footerContainer}
		>
			<Text style={styles.footerText}>Add a new friend! 🎉</Text>
		</TouchableHighlight>
	);

	_keyExtractor = item => item.uid.toString();

	return (
		<>
			<Text style={TextStyles.headerWhite}>MY FRIENDS</Text>
			<SuperEllipseMask style={{ marginTop: CARD_GUTTER }} radius={BORDER_RADIUS}>
				<FlatList
					scrollEnabled={false}
					style={styles.listBackground}
					data={friends}
					renderItem={renderUser}
					ItemSeparatorComponent={renderSeparator}
					ListFooterComponent={renderFooter}
					keyExtractor={_keyExtractor}
				/>
			</SuperEllipseMask>
		</>
	);
};

const styles = StyleSheet.create({
	container: { marginTop: 15 },
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		marginBottom: 5
	},
	listBackground: {
		backgroundColor: "white"
	},
	separator: {
		width: SCREEN_WIDTH - 15,
		marginLeft: 15,
		height: 1,
		backgroundColor: Colors.lightGray
	},
	footerContainer: {
		borderTopWidth: 0.5,
		borderColor: Colors.mediumGray,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20
	},
	footerText: {
		fontSize: 18,
		fontWeight: "300",
		color: Colors.gray
	}
});

export default Friends;
