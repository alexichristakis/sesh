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

import Group from "../Groups/Group";

import { ShowGroupFocus, ShowCreateGroup } from "../../lib/navigation";
import { SCREEN_WIDTH, CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";
import { Colors, TextStyles, SeparatorStyles } from "../../lib/styles";

const Groups = ({ groups }) => {
	handleOnPressGroup = group => {
		ShowGroupFocus({ group });
	};

	renderGroup = ({ item, index }) => (
		<TouchableHighlight
			style={{ backgroundColor: "white" }}
			activeOpacity={0.8}
			underlayColor={Colors.mediumGray}
			onPress={() => handleOnPressGroup(item)}
		>
			<Group data={item} />
		</TouchableHighlight>
	);

	renderSeparator = () => <View style={SeparatorStyles.groups} />;

	renderFooter = () => (
		<TouchableHighlight
			onPress={ShowCreateGroup}
			underlayColor={Colors.mediumGray}
			style={styles.footerContainer}
		>
			<Text style={styles.footerText}>Create a group! 🎉</Text>
		</TouchableHighlight>
	);

	_keyExtractor = item => item.id.toString();

	return (
		<>
			<Text style={TextStyles.headerWhite}>MY GROUPS</Text>
			<SuperEllipseMask style={{ marginTop: CARD_GUTTER }} radius={BORDER_RADIUS}>
				<FlatList
					scrollEnabled={false}
					style={styles.listBackground}
					data={groups}
					renderItem={renderGroup}
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

export default Groups;

// import React, { Component } from "react";
// import { Animated, View, Text } from "react-native";

// // import Group from "../Groups/Group";
// import GroupWrapper from "./GroupWrapper";
// // import TouchableScale from "../global/TouchableScale";

// import { TextStyles } from "../../lib/styles";
// import { ShowGroupFocus } from "../../lib/navigation";

// class Groups extends Component {
// 	render() {
// 		const { groups } = this.props;
// 		return (
// 			<>
// 				<Text style={TextStyles.headerWhite}>MY GROUPS</Text>
// 				{groups.map(group => (
// 					<GroupWrapper key={group.id} group={group} />
// 				))}
// 			</>
// 		);
// 	}
// }

// export default Groups;
