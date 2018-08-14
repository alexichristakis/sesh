import React from "react";
import { StyleSheet, Animated, FlatList, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import { Colors, TextStyles } from "../../lib/styles";
import { IS_X, BORDER_RADIUS, CARD_GUTTER, SCREEN_WIDTH, SCREEN_HEIGHT } from "../../lib/constants";

import Move from "../global/Move";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const activeEmptyMessage =
	"No active moves! Create one to let your friends know what's going on now.";
const laterEmptyMessage =
	"No later moves! Create one to let your friends know what's going on later.";

const Feed = ({
	user,
	moves,
	onHoScroll,
	onVertScroll,
	onVertScrollEndDrag,
	handleTransition,
	hoScrollRef
}) => {
	const activeData = moves.filter(move => move.time <= Date.now()).sort((a, b) => b.time - a.time);
	const laterData = moves.filter(move => move.time > Date.now()).sort((a, b) => a.time - b.time);

	transitionToActiveFocus = (dimensions, onReturn, cardData) => {
		handleTransition({
			...dimensions,
			onReturn,
			cardData,
			isActive: true
		});
	};

	transitionToLaterFocus = (dimensions, onReturn, cardData) => {
		handleTransition({
			...dimensions,
			onReturn,
			cardData,
			isActive: false
		});
	};

	renderEmptyListComponent = ({ isActive }) => (
		<SuperEllipseMask style={styles.emptyCardContainer} radius={BORDER_RADIUS}>
			<Text style={TextStyles.body}>{isActive ? activeEmptyMessage : laterEmptyMessage}</Text>
		</SuperEllipseMask>
	);

	renderActiveMove = ({ item, index }) => (
		<Move
			active
			index={index}
			move={item}
			userLocation={user.location}
			transition={transitionToActiveFocus}
		/>
	);

	renderLaterMove = ({ item, index }) => (
		<Move
			later
			index={index}
			move={item}
			userLocation={user.location}
			transition={transitionToLaterFocus}
		/>
	);

	_keyExtractor = move => move.id.toString();

	return (
		<Animated.ScrollView
			horizontal
			pagingEnabled
			ref={hoScrollRef}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			onScroll={onHoScroll}
			style={styles.horizontalScroll}
		>
			<AnimatedFlatList
				style={styles.list}
				contentContainerStyle={styles.content}
				data={activeData}
				renderItem={renderActiveMove}
				scrollEventThrottle={16}
				onScroll={onVertScroll}
				onScrollEndDrag={onVertScrollEndDrag}
				keyExtractor={_keyExtractor}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => renderEmptyListComponent({ isActive: true })}
			/>
			<AnimatedFlatList
				style={styles.list}
				contentContainerStyle={styles.content}
				data={laterData}
				renderItem={renderLaterMove}
				scrollEventThrottle={16}
				onScroll={onVertScroll}
				onScrollEndDrag={onVertScrollEndDrag}
				keyExtractor={_keyExtractor}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => renderEmptyListComponent({ isActive: false })}
			/>
		</Animated.ScrollView>
	);
};

const styles = StyleSheet.create({
	horizontalScroll: {
		flex: 1,
		flexDirection: "row"
	},
	list: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		paddingTop: IS_X ? 60 : 56,
		backgroundColor: "transparent"
	},
	content: {
		paddingBottom: 125
	},
	emptyCardContainer: {
		marginHorizontal: CARD_GUTTER,
		backgroundColor: "white",
		padding: 20
	}
});

export default Feed;
