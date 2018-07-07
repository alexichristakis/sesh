import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  BORDER_RADIUS,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

import TouchableScale from "../global/TouchableScale";
import MapCard from "../global/MapCard";
import User from "../global/User";

const LaterFocus = props => {
  _renderItem = ({ item }) => <User data={item} />;

  const buttonStyle = [
    styles.joinButton,
    {
      backgroundColor: props.joined ? Colors.later : "white"
    }
  ];

  const textStyle = [
    styles.joinText,
    {
      color: props.joined ? "white" : Colors.later
    }
  ];

  const { style, moveLocation, userLocation, open, joined, handleOnPress } = props;
  return (
    <View style={style}>
      <MapCard
        later
        loading={!open}
        style={styles.mapCard}
        userLocation={userLocation}
        markers={[{ coords: moveLocation, key: "location" }]}
      />
      <TouchableScale onPress={handleOnPress}>
        <SuperEllipseMask radius={BORDER_RADIUS}>
          <View style={buttonStyle}>
            <Text style={textStyle}>{!joined ? "Join" : "Leave"}</Text>
          </View>
        </SuperEllipseMask>
      </TouchableScale>
    </View>
  );
};

const styles = StyleSheet.create({
  mapCard: {
    marginVertical: CARD_GUTTER
  },
  joinButton: {
    flex: 1,
    // marginVertical: 20,
    padding: 15,
    // borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
    // ...shadow,
  },
  joinText: {
    // flex: 1,
    // color: Colors.active,
    fontSize: 18
  }
});

export default LaterFocus;
