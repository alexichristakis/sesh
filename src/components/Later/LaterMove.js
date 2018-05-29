import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { BlurView } from "react-native-blur";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

const ICON_SIZE = 50;

class LaterMove extends Component {
	render() {
		const move = this.props.move;
		return (
			// <View style={{ flex: 1 }}>
			<BlurView blurType={"xlight"} style={styles.container}>
				<View style={styles.top}>
					<Image style={styles.image} resizeMode="cover" source={{ uri: move.photo }} />
					<View style={styles.header}>
						<View style={{ flex: 2 }}>
							<Text style={styles.group}>{move.group}</Text>
							<View style={{ flexDirection: "row" }}>
								<Text style={{ fontSize: 14 }}>from </Text>
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
				</View>{" "}
			</BlurView>

			// </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: "row",
		// alignItems: "center",
		// marginHorizontal: 10,
		// borderWidth: 20,
		// borderColor: Colors.primary,
		borderRadius: 15,
		padding: 10,
		paddingRight: 12
	},
	top: {
		flex: 2,
		flexDirection: "row"
	},
	image: {
		alignSelf: "center",
		backgroundColor: Colors.gray,
		borderRadius: ICON_SIZE / 2,
		height: ICON_SIZE,
		width: ICON_SIZE
	},
	header: {
		flex: 1,
		flexDirection: "row",
		alignSelf: "center",
		marginLeft: 10,
		marginBottom: 3
	},
	name: {
		fontSize: 14,
		fontWeight: "bold"
	},
	group: {
		fontSize: 24,
		fontWeight: "900"
		// color: Colors.currently,
	},
	time: {
		flex: 1,
		textAlign: "right",
		paddingTop: 4,
		fontSize: 14,
		// alignSelf: "center",
		color: Colors.later,
		fontWeight: "900"
	},
	mid: {
		flex: 2,
		marginVertical: 10
	},
	description: {
		fontSize: 14
	},
	bottom: {
		flex: 1,
		alignSelf: "flex-end"
	},
	location: {
		fontSize: 14,
		// fontWeight: "200",
		color: Colors.later
	}
});

export default LaterMove;
