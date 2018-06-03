import React, { Component } from "react";
import { ActivityIndicator, View, Text, Image } from "react-native";

import MapView, { Marker } from "react-native-maps";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

class MapCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 200);
	}

	render() {
		const { location, title, style } = this.props;
		const region = {
			latitude: location.latitude,
			longitude: location.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		};

		let map = (
			<MapView style={{ flex: 1 }} initialRegion={region}>
				<Marker coordinate={location} title={title} />
			</MapView>
		);

		return (
			<View
				style={{
					height: 200,
					backgroundColor: "#F9F5ED",
					borderRadius: 15,
					overflow: "hidden",
					...shadow,
				}}>
				{this.state.loading && <ActivityIndicator style={{ marginTop: 100 }} size={"large"} />}
				{!this.state.loading && map}
			</View>
		);
	}
}

export default MapCard;
