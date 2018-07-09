import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Icon from "react-native-vector-icons/Feather";
import geolib from "geolib";
import moment from "moment";

import { Colors, shadow } from "../../lib/styles";
import { BORDER_RADIUS } from "../../lib/constants";

const ICON_SIZE = 50;

const LaterMove = props => {
  const { photo, group, name, description, time } = props.move;

  formatDistanceAway = () => {
    const miles = geolib.getDistance(props.move.location, props.coords) * 0.000621;
    return Math.round(100 * miles) / 100 + "mi";
  };

  const handleGroupOnPress = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    props.onPressPresentOverlayTo("sesh.Focus", {
      groups: true,
      data: { name: group, size: 12 }
    });
  };

  return (
    <SuperEllipseMask style={styles.container} radius={BORDER_RADIUS}>
      <View style={styles.top}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: photo, cache: "force-cache" }}
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGroupOnPress}>
            <Text style={styles.group}>{group}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Icon name={"corner-left-up"} size={14} color={Colors.later} />
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.bottom}>
        <Text style={styles.time}>{moment(time).fromNow()}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name={"compass"} size={14} color={Colors.gray} />
          <Text style={styles.location}>{formatDistanceAway()}</Text>
        </View>
      </View>
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  top: {
    padding: 10,
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
    flex: 2,
    alignSelf: "center",
    marginLeft: 10,
    marginBottom: 3
  },
  name: {
    paddingTop: 2,
    paddingLeft: 3,
    fontSize: 14,
    color: Colors.gray
  },
  group: {
    fontSize: 24,
    fontWeight: "300"
  },
  time: {
    textAlign: "right",
    fontSize: 14,
    color: Colors.gray
  },
  description: {
    flex: 2,
    paddingHorizontal: 10,
    fontSize: 14
  },
  bottom: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  location: {
    paddingTop: 1,
    marginLeft: 2,
    fontSize: 14,
    color: Colors.gray
  }
});

export default LaterMove;
