import React from "react";
import { StyleSheet, Animated, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import Move from "../global/Move";
import TouchableScale from "../global/TouchableScale";
// import Transition from "../global/Transition";

import { TextStyles } from "../../lib/styles";
import { ShowCreateActiveMove, ShowCreateLaterMove } from "../../lib/navigation";
import { IS_X, BORDER_RADIUS, CARD_GUTTER, SCREEN_WIDTH, SCREEN_HEIGHT } from "../../lib/constants";

const Feed = ({
	user,
	moves,
	hoScrollRef,
	onHoScroll,
	onVertScroll,
	onVertScrollEndDrag,
	handleTransition
}) => {
	const arr = moves.filter(move => !move.ended);
	const activeData = arr.filter(move => move.time <= Date.now()).sort((a, b) => b.time - a.time);
	const laterData = arr.filter(move => move.time > Date.now()).sort((a, b) => a.time - b.time);

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

	// handleTransition = props => {
	// 	ShowMoveFocus({ props });
	// };

	renderEmptyListComponent = ({ isActive }) => (
		<TouchableScale onPress={isActive ? ShowCreateActiveMove : ShowCreateLaterMove}>
			<SuperEllipseMask style={styles.emptyCardContainer} radius={BORDER_RADIUS}>
				<Text style={TextStyles.body}>
					{isActive
						? "No active moves! Create one to let your friends know what's going on now."
						: "No later moves! Create one to let your friends know what's going on later."}
				</Text>
			</SuperEllipseMask>
		</TouchableScale>
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
			<Animated.FlatList
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
			<Animated.FlatList
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
		paddingTop: IS_X ? 90 : 76,
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
