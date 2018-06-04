import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import Icon from "react-native-vector-icons/Entypo";

import { Navigation } from "react-native-navigation";

import { FacebookLogin } from "../../api";
import { Colors } from "../../lib/styles";

import Button from "../global/Button";
import Waves from "../global/Waves";

type Props = {};
export default class App extends Component<Props> {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		};
	}

	cancelLogin = () => {
		this.setState({ loading: false });
	};

	onPressFacebook = () => {
		this.setState({ loading: true });
		FacebookLogin(this.cancelLogin).then(user => {
			if (user) {
				console.log(user);
				this.setState({ loading: false });
				Navigation.push(this.props.componentId, {
					component: {
						name: "sesh.Home",
						passProps: {
							user: user.user._user,
						},
					},
				});
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="dark-content" />
				{/* <Waves /> */}
				<View style={{ flex: 1, alignItems: "center" }}>
					<Text style={{ fontSize: 24, color: Colors.gray }}>welcome to</Text>
					<Text style={{ fontSize: 50, fontWeight: "900" }}>Sesh</Text>
				</View>

				<Button
					style={{ backgroundColor: Colors.primary }}
					title={<Icon name="facebook" size={28} color={"white"} />}
					onPress={this.onPressFacebook}
					loading={this.state.loading}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	instructions: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5,
	},
});
