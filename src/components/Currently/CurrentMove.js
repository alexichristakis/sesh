import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

const ICON_SIZE = 50;

class CurrentMove extends Component {
	render() {
		const move = this.props.move;
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.top}>
					<Image style={styles.image} resizeMode="cover" source={{ uri: move.photo }} />
					<View style={styles.header}>
						<View style={{ flex: 1 }}>
							<Text style={styles.group}>{move.group}</Text>
							<View style={{ flexDirection: "row" }}>
								<Text style={{ fontSize: 18 }}>from </Text>
								<Text style={styles.name}>{move.name}</Text>
							</View>
						</View>
						<Text style={styles.time}>{TimeAgo(move.time)}</Text>
					</View>
				</View>
				<View style={styles.mid}>
					<Text style={styles.description}>{move.description}</Text>
				</View>
				<View style={styles.bottom}>
					<Text style={styles.location}>{move.location}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	top: {
		flex: 2,
		flexDirection: "row",
	},
	image: {
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE / 2,
		height: ICON_SIZE,
		width: ICON_SIZE,
	},
	header: {
		flex: 1,
		flexDirection: "row",
		alignSelf: "center",
		marginLeft: 10,
		marginBottom: 3,
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
	},
	group: {
		fontSize: 24,
		fontWeight: "900",
		// color: Colors.currently,
	},
	time: {
		paddingTop: 4,
		fontSize: 18,
		// alignSelf: "center",
		color: Colors.currently,
		fontWeight: "bold",
	},
	mid: {
		flex: 2,
		marginVertical: 10,
	},
	description: {
		fontSize: 14,
	},
	bottom: {
		flex: 1,
		alignSelf: "flex-end",
	},
	location: {
		fontSize: 14,
		// fontWeight: "200",
		color: Colors.currently,
	},
});

export default CurrentMove;
