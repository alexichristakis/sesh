import React, { Component } from "react";
import { StyleSheet, Animated, View, Text } from "react-native";

import _ from "lodash";

import { BlurView } from "react-native-blur";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import TouchableScale from "../global/TouchableScale";

import {
	SCREEN_WIDTH,
	SCREEN_HEIGHT,
	SB_HEIGHT,
	BORDER_RADIUS,
	CARD_GUTTER
} from "../../lib/constants";
import { Colors, TextStyles, SeparatorStyles } from "../../lib/styles";

const JoinButton = ({
	active,
	// joined,
	loading,
	moves,
	user,
	transitioning,
	id,
	shouldEnd,
	onPress,
	deltaY,
	yOffset,
	dimensions
}) => {
	const { openOffset, closedOffset, height, pageY } = dimensions;
	const { joinMove, leaveMove, endMove } = onPress;
	const color = active ? Colors.active : Colors.later;

	const { uid, fb_id, name } = user;

	let joined;
	if (!loading) {
		const goingUsers = moves.moves.find(move => move.id === id).going;
		joined = _.find(goingUsers, { uid, fb_id, name });
	} else {
		joined = _.find(moves.joinedMoves, { uid, fb_id, name }) === undefined ? false : true;
	}

	let joinButtonStyle = [
		styles.button,
		{
			backgroundColor: joined ? color : "transparent"
		}
	];

	let endMoveButtonStyle = [
		styles.button,
		{
			backgroundColor: Colors.red
		}
	];

	let textStyle = [
		TextStyles.header,
		{
			color: shouldEnd ? "white" : joined ? "white" : color
		}
	];

	let animatedJoinButton = {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		opacity: deltaY.interpolate({
			inputRange: [openOffset, openOffset + 10, pageY],
			outputRange: openOffset < pageY ? [1, 0, 0] : [0, 0, 1]
		}),
		transform: [
			{
				translateY: deltaY.interpolate({
					inputRange: [openOffset, openOffset + 10, pageY],
					outputRange: [height + 25, height, 0]
				})
			}
		]
	};

	let openJoinButtonStyle = {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		transform: [
			{
				translateY: yOffset.interpolate({
					inputRange: [-closedOffset / 2, 0, 25, 50],
					outputRange: [pageY / 1.5, height + 25, height, height - 30],
					extrapolateRight: "clamp"
				})
			}
		]
	};

	const handleOnPress = shouldEnd ? endMove : joined ? leaveMove : joinMove;
	console.log(handleOnPress);
	return (
		<Animated.View style={!transitioning ? openJoinButtonStyle : animatedJoinButton}>
			<TouchableScale onPress={() => handleOnPress(id)}>
				<SuperEllipseMask style={styles.buttonMask} radius={BORDER_RADIUS}>
					<BlurView blurType="light" style={shouldEnd ? endMoveButtonStyle : joinButtonStyle}>
						<Text style={textStyle}>{shouldEnd ? "End Sesh" : joined ? "Leave" : "Join"}</Text>
					</BlurView>
				</SuperEllipseMask>
			</TouchableScale>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	buttonMask: {
		marginVertical: CARD_GUTTER,
		marginHorizontal: 15
	},
	button: {
		// marginVertical: CARD_GUTTER,
		// marginHorizontal: 15,
		paddingVertical: 15,
		paddingTop: 25,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default JoinButton;
