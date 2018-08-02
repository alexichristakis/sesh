import React, { Fragment } from "react";
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

const ActiveFocus = props => {
  _renderItem = ({ item }) => <User data={item} />;

  let buttonStyle = [
    styles.joinButton,
    {
      backgroundColor: props.joined ? Colors.active : "white"
    }
  ];

  let textStyle = [
    styles.joinText,
    {
      color: props.joined ? "white" : Colors.active
    }
  ];

  const { moveLocation, userLocation, open, joined, handleOnPress } = props;
  return (
    <Fragment>
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
    </Fragment>
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
