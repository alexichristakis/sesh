import React from "react";
import { StyleSheet, ScrollView, FlatList, View, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import TouchableScale from "../global/TouchableScale";
import MapCard from "../global/MapCard";
import User from "../global/User";
import LoadingCircle from "../global/LoadingCircle";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  BORDER_RADIUS,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

const ActiveFocus = ({
  moveLocation,
  userLocation,
  open,
  joined,
  loading,
  users,
  handleOnPress
}) => {
  _renderItem = ({ item }) => <User data={item} />;

  _renderSeparator = () => <View style={styles.separator} />;

  _keyExtractor = item => item.id.toString();

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

      {loading ? (
        <LoadingCircle style={styles.loading} size={20} />
      ) : (
        <SuperEllipseMask style={styles.joinedUsersContainer} radius={BORDER_RADIUS}>
          <FlatList
            data={users}
            renderItem={_renderItem}
            ItemSeparatorComponent={_renderSeparator}
            keyExtractor={_keyExtractor}
          />
        </SuperEllipseMask>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mapCard: {
    marginVertical: CARD_GUTTER
  },
  loading: {
    alignSelf: "center",
    marginTop: 50
  },
  joinButton: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  joinText: {
    fontSize: 18
  },
  joinedUsersContainer: {
    backgroundColor: "white",
    marginVertical: CARD_GUTTER
  },
  separator: {
    width: SCREEN_WIDTH - 15,
    marginLeft: 15,
    height: 1,
    backgroundColor: Colors.mediumGray
  }
});

export default ActiveFocus;
