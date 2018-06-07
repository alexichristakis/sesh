import React, { Component } from "react";
import { ActivityIndicator, View, Text, Image } from "react-native";

import MapView, { Marker } from "react-native-maps";
import SuperEllipseMask from "react-native-super-ellipse-mask";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

class MapCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 200);
  }

  render() {
    const { markers, style } = this.props;
    // console.log(markers);
    const region = {
      latitude: markers[0].coords.latitude,
      longitude: markers[0].coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    let map = (
      <MapView showsUserLocation style={{ flex: 1 }} initialRegion={region}>
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.coords}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    );

    return (
      <SuperEllipseMask radius={20}>
        <View
          style={{
            height: this.props.large ? 300 : 200,
            backgroundColor: "#F9F5ED"
            // borderRadius: 15,
            // overflow: "hidden",
            // ...shadow
          }}
        >
          {this.state.loading && <ActivityIndicator style={{ marginTop: 100 }} size={"large"} />}
          {!this.state.loading && map}
        </View>
      </SuperEllipseMask>
    );
  }
}

export default MapCard;
