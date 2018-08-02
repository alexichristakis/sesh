import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import TouchableScale from "../global/TouchableScale";
import MapCard from "../global/MapCard";
import User from "../global/User";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  BORDER_RADIUS,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

const ActiveFocus = ({ moveLocation, userLocation, open, joined, handleOnPress }) => {
  _renderItem = ({ item }) => <User data={item} />;

  let buttonStyle = [
    styles.joinButton,
    {
      backgroundColor: joined ? Colors.active : "white"
    }
  ];

  let textStyle = [
    styles.joinText,
    {
      color: joined ? "white" : Colors.active
    }
  ];

  return (
    <>
      <MapCard
        active
        loading={!open}
        style={styles.mapCard}
        userLocation={userLocation}
        markers={[{ coords: moveLocation, active: true, key: "location" }]}
      />
      <TouchableScale onPress={handleOnPress}>
        <SuperEllipseMask style={buttonStyle} radius={BORDER_RADIUS}>
          <Text style={textStyle}>{!joined ? "Join" : "Leave"}</Text>
        </SuperEllipseMask>
      </TouchableScale>
      {/* <FlatList /> */}
    </>
  );
};

const styles = StyleSheet.create({
  mapCard: {
    marginVertical: CARD_GUTTER
  },
  joinButton: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  joinText: {
    fontSize: 18
  }
});

export default ActiveFocus;
