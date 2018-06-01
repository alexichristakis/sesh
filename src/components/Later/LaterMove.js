import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "react-native-blur";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

const ICON_SIZE = 50;

class LaterMove extends Component {
	render() {
		const move = this.props.move;
		return (
			<View style={styles.container}>
				<LinearGradient
					style={styles.background}
					locations={[0.95, 1]}
					colors={["white", Colors.later]}
				/>
				<BlurView blurType={"light"} style={styles.blur}>
					<View style={styles.top}>
						<Image style={styles.image} resizeMode="cover" source={{ uri: move.photo }} />
						<View style={styles.header}>
							<View style={{ flex: 2 }}>
								<Text style={styles.group}>{move.group}</Text>
								<View style={{ flexDirection: "row" }}>
									<Text style={{ fontSize: 14, color: Colors.gray }}>from </Text>
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
				</BlurView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 15,
		overflow: "hidden",
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: Colors.later,
		opacity: 0.2,
	},
	blur: {
		flex: 1,
		// flexDirection: "row",
		// alignItems: "center",
		// marginHorizontal: 10,
		// borderWidth: 0.1,
		// borderColor: Colors.Gray,
		// backgroundColor: Colors.primary,

		padding: 10,
		paddingRight: 12,

		// ...shadow
	},
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
		fontSize: 14,
		fontWeight: "bold",
		color: Colors.gray,
	},
	group: {
		fontSize: 24,
		fontWeight: "800",
		// color: Colors.later,
	},
	time: {
		flex: 1,
		textAlign: "right",
		paddingTop: 4,
		fontSize: 14,
		// alignSelf: "center",
		color: Colors.later,
		fontWeight: "800",
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
		color: Colors.later,
	},
});

export default LaterMove;
