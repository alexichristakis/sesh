import React, { Component } from "react";
import { StyleSheet, ScrollView, FlatList, View, Text } from "react-native";

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

	renderUser = ({ item }) => <User user={item} />;

	renderSeparator = () => <View style={SeparatorStyles.users} />;

	_keyExtractor = item => item.uid;

	render() {
		const { active, cardData, moves, user, open } = this.props;
		const { joined, loading } = this.state;
		const color = active ? Colors.active : Colors.later;

		let buttonStyle = [
			styles.joinButton,
			{
				backgroundColor: joined ? color : "transparent"
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

		return (
			<>
				<TouchableScale disabled={loading} onPress={this.handleOnPressJoin}>
					<SuperEllipseMask style={styles.buttonMask} radius={BORDER_RADIUS}>
						<BlurView blurType="light" style={buttonStyle}>
							<Text style={textStyle}>{!joined ? "Join" : "Leave"}</Text>
						</BlurView>
					</SuperEllipseMask>
				</TouchableScale>
				<Text style={TextStyles.headerWhite}>LOCATION</Text>
				<MapCard
					active={active}
					loading={!open}
					style={styles.mapCard}
					userLocation={user.location}
					markers={[{ coords: cardData.location, active, key: "location" }]}
				/>
				{/* THIS IS SUCH A HACK TODO: FIND A BETTER WAY*/}
				{goingUsers.length === 0 ? (
					<LoadingCircle style={styles.loading} size={20} />
				) : (
					<>
						<Text style={[styles.header, TextStyles.headerWhite]}>GOING</Text>
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
	joinButton: {
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
