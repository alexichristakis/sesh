import React, { Component } from "react";
import { StyleSheet, FlatList, Animated, View, Text } from "react-native";

import _ from "lodash";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import { BlurView } from "react-native-blur";

import TouchableScale from "../global/TouchableScale";
import MapCard from "../global/MapCard";
import User from "../global/User";
import LoadingCircle from "../global/LoadingCircle";
import GoingUsers from "./GoingUsers";

import {
	SCREEN_WIDTH,
	SCREEN_HEIGHT,
	SB_HEIGHT,
	BORDER_RADIUS,
	CARD_GUTTER
} from "../../lib/constants";
import { Colors, TextStyles, SeparatorStyles } from "../../lib/styles";

class MoveFocus extends Component {
	constructor(props) {
		super(props);

		const { user, moves, cardData } = this.props;
		const { uid, fb_id, name } = user;
		const goingUsers = moves.find(move => move.id === cardData.id).going;

		const joined = _.find(goingUsers, { uid, fb_id, name });

		this.state = {
			joined: joined != undefined ? true : false,
			loading: true
		};
	}

	componentDidMount() {
		const { user, fetchGoingUsers, cardData } = this.props;
		const { uid, fb_id, name } = user;

		fetchGoingUsers(cardData.id).then(() => {
			const { moves } = this.props;
			const goingUsers = moves.find(move => move.id === cardData.id).going;
			const joined = _.find(goingUsers, { uid, fb_id, name });
			this.setState({ joined: joined != undefined ? true : false, loading: false });
		});
	}

	handleOnPressJoin = () => {
		const { cardData, joinMove, leaveMove } = this.props;
		const { joined } = this.state;

		this.setState({ joined: !joined, loading: true }, () => {
			if (joined) leaveMove(cardData.id).then(() => this.setState({ loading: false }));
			else joinMove(cardData.id).then(() => this.setState({ loading: false }));
		});
	};

	handleOnPressEnd = () => {
		const { cardData, endMove, dismissFocus } = this.props;

		endMove(cardData.id).then(() => dismissFocus());
	};

	renderUser = ({ item }) => <User user={item} />;

	renderSeparator = () => <View style={SeparatorStyles.users} />;

	_keyExtractor = item => item.uid;

	render() {
		const { active, cardData, moves, user, open, transitioning, deltaY, dimensions } = this.props;
		const { joined, loading } = this.state;
		const color = active ? Colors.active : Colors.later;
		const isMyMove = cardData.uid === user.uid;

		const { openOffset, closedOffset, height, pageY } = dimensions;

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
				color: joined ? "white" : color
			}
		];

		const goingUsers = moves.find(move => move.id === cardData.id).going;
		const List = (
			<SuperEllipseMask style={styles.goingContainer} radius={BORDER_RADIUS}>
				<FlatList
					data={goingUsers.sort((a, b) => b.ts > a.ts)}
					renderItem={this.renderUser}
					ItemSeparatorComponent={this.renderSeparator}
					keyExtractor={this._keyExtractor}
				/>
			</SuperEllipseMask>
		);

		let animatedJoinButton = {
			// position: "absolute",
			// left: 0,
			// right: 0,
			top: -200,
			// opacity: deltaY.interpolate({
			// 	inputRange: [openOffset, openOffset + 10, pageY],
			// 	outputRange: openOffset < pageY ? [1, 0, 0] : [0, 0, 1]
			// }),
			transform: [
				{
					translateY: deltaY.interpolate({
						inputRange: [openOffset, openOffset + 10, pageY],
						outputRange: [height + 25, height, 0]
					})
				}
			]
		};

		// let openJoinButtonStyle = {
		// 	position: "absolute",
		// 	left: 0,
		// 	right: 0,
		// 	top: 0,
		// 	transform: [
		// 		{
		// 			translateY: yOffset.interpolate({
		// 				inputRange: [-closedOffset / 2, 0, 25, 50],
		// 				outputRange: [pageY / 1.5, height + 25, height, height - 30],
		// 				extrapolateRight: "clamp"
		// 			})
		// 		}
		// 	]
		// };

		const JoinMoveButton = (
			<TouchableScale disabled={loading} onPress={this.handleOnPressJoin}>
				<SuperEllipseMask style={styles.buttonMask} radius={BORDER_RADIUS}>
					<BlurView blurType="light" style={joinButtonStyle}>
						<Text style={textStyle}>{!joined ? "Join" : "Leave"}</Text>
					</BlurView>
				</SuperEllipseMask>
			</TouchableScale>
		);

		const EndMoveButton = (
			<TouchableScale disabled={loading} onPress={this.handleOnPressEnd}>
				<SuperEllipseMask style={styles.buttonMask} radius={BORDER_RADIUS}>
					<BlurView blurType="light" style={endMoveButtonStyle}>
						<Text style={textStyle}>End Move</Text>
					</BlurView>
				</SuperEllipseMask>
			</TouchableScale>
		);

		return (
			<>
				{/*<Animated.View style={animatedJoinButton}>
									{isMyMove ? EndMoveButton : JoinMoveButton}
								</Animated.View>*/}
				<Text style={TextStyles.headerWhite}>LOCATION</Text>
				<MapCard
					active={active}
					loading={!open}
					style={styles.mapCard}
					userLocation={user.location}
					markers={[{ coords: cardData.location, active, key: "location" }]}
				/>

				{goingUsers.length === 0 ? (
					<LoadingCircle style={styles.loading} size={20} />
				) : (
					<>
						<Text style={[styles.header, TextStyles.headerWhite]}>GOING</Text>
						{/* THIS IS SUCH A HACK TODO: FIND A BETTER WAY*/}
						{loading && List}
						{!loading && List}
					</>
				)}
			</>
		);
	}
}

const styles = StyleSheet.create({
	mapCard: {
		marginTop: CARD_GUTTER
	},
	loading: {
		alignSelf: "center",
		marginTop: 50
	},
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
	},
	goingContainer: {
		// flex: 1,
		// width: 500,
		// height: 500,
		backgroundColor: "white",
		marginTop: CARD_GUTTER
		// paddingBottom: 400
	},
	separator: {
		width: SCREEN_WIDTH - 24.5,
		marginLeft: 24.5,
		height: 1,
		backgroundColor: Colors.lightGray
	}
});

export default MoveFocus;
