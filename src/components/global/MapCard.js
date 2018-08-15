import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import SuperEllipseMask from "react-native-super-ellipse-mask";

import LoadingCircle from "./LoadingCircle";

import { GenerateInitialRegion } from "../../lib/functions";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  CARD_GUTTER,
  BORDER_RADIUS
} from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

const MapCard = props => {
  const { markers = [], userLocation, style, height = 250 } = props;
  const { initialRegion = GenerateInitialRegion(markers, userLocation) } = props;

  let map = !props.draggable ? (
    <MapView showsUserLocation style={styles.mapView} initialRegion={initialRegion}>
      {markers.map(marker => (
        <Marker
          key={marker.key}
          coordinate={marker.coords}
          title={marker.group}
          description={marker.description}
        >
          <Icon
            name={"ios-pin"}
            size={28}
            color={marker.active ? Colors.activeBackground1 : Colors.laterBackground1}
          />
        </Marker>
      ))}
    </MapView>
  ) : (
    <View style={styles.mapView}>
      <MapView
        showsUserLocation
        style={styles.mapView}
        onRegionChangeComplete={props.onRegionChangeComplete}
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
        color={props.active ? Colors.activeBackground1 : Colors.laterBackground1}
      />
    </View>
  );

  return (
    <SuperEllipseMask style={style} radius={props.fullBleed ? 0 : BORDER_RADIUS}>
      <View style={{ height: height, backgroundColor: "#F9F5ED" }}>
        {props.loading && (
          <LoadingCircle
            active={props.active}
            later={props.later}
            style={{ marginTop: height / 2 - 10, alignSelf: "center" }}
            size={20}
          />
        )}
        {!props.loading && map}
      </View>
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  mapView: { flex: 1 }
});

export default MapCard;
