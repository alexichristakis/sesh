import React, { Component } from "react";
import { ActivityIndicator, View, Text, Image } from "react-native";

import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import SuperEllipseMask from "react-native-super-ellipse-mask";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, BORDER_RADIUS } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

class MapCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ loading: false });
  //   }, 600);
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) this.setState({ loading: true });
    else if (!nextProps.loading) this.setState({ loading: false });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.loading !== nextState.loading) return true;
    else return false;
  }

  render() {
    const {
      markers = [{ key: "test", coords: { latitude: 47.675598, longitude: -122.263837 } }],
      initialRegion = {
        latitude: 47.675598,
        longitude: -122.263837,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      style,
      height = 200
    } = this.props;
    // console.log(markers);
    // const region = {
    //   latitude: markers[0].coords.latitude,
    //   longitude: markers[0].coords.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421
    // };

    // const height;
    // if (this.props.height) height = this.props.height;
    // else height = this.props.large ? SCREEN_HEIGHT - SB_HEIGHT - 75 : 200;

    let map = !this.props.draggable ? (
      <MapView showsUserLocation style={{ flex: 1 }} initialRegion={initialRegion}>
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.coords}
            title={marker.title}
            description={marker.description}
          >
            <Icon
              name={"ios-pin"}
              size={28}
              color={this.props.active ? Colors.activeBackground1 : Colors.laterBackground1}
            />
          </Marker>
        ))}
      </MapView>
    ) : (
      <View style={{ flex: 1 }}>
        <MapView
          showsUserLocation
          style={{ flex: 1 }}
          onRegionChangeComplete={this.props.onRegionChangeComplete}
          initialRegion={initialRegion}
        />
        <Icon
          style={{
            position: "absolute",
            bottom: height / 2 - 5,
            alignSelf: "center"
          }}
          name={"ios-pin"}
          size={40}
          color={this.props.active ? Colors.activeBackground1 : Colors.laterBackground1}
        />
      </View>
    );

    return (
      <SuperEllipseMask style={style} radius={this.props.fullBleed ? 0 : BORDER_RADIUS}>
        <View style={{ height: height, backgroundColor: "#F9F5ED" }}>
          {this.state.loading && (
            <ActivityIndicator
              style={{ marginTop: height / 2 - 10, alignSelf: "center" }}
              size={"large"}
            />
          )}
          {!this.state.loading && map}
        </View>
      </SuperEllipseMask>
    );
  }
}

export default MapCard;
