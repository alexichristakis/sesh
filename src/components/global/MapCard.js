import React from "react";
import { View, Text, Image } from "react-native";

import MapView, { Marker } from "react-native-maps";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

class MapCard extends React.PureComponent {
	render() {
		const { location, title, style } = this.props;
		const region = {
			latitude: location.latitude,
			longitude: location.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		};

		return (
			<View
				style={{
					height: 200,
					borderRadius: 15,
					overflow: "hidden"
				}}
			>
				<MapView style={{ flex: 1 }} initialRegion={region}>
					<Marker coordinate={location} title={title} />
				</MapView>
			</View>
		);
	}
}

export default MapCard;
