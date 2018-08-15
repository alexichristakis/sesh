import React from "react";
import { StyleSheet, ScrollView, FlatList, View, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import { BlurView } from "react-native-blur";

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
import { Colors, TextStyles } from "../../lib/styles";

const ActiveFocus = ({
  moveLocation,
  userLocation,
  open,
  joined,
  loading,
  users,
  handleOnPress
}) => {
  _renderItem = ({ item }) => <User user={item} onPress={() => {}} />;

  _renderSeparator = () => <View style={styles.separator} />;

  _renderHeader = () => (
    <View
      style={{
        paddingVertical: 12,
        paddingLeft: 12,
        // alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: Colors.lightGray
      }}
    >
      <Text style={{ fontSize: 18 }}>Going:</Text>
    </View>
  );

  _keyExtractor = item => item.uid;

  let buttonStyle = [
    styles.joinButton,
    {
      backgroundColor: joined ? Colors.active : "transparent"
    }
  ];

  let textStyle = [
    TextStyles.header,
    {
      color: joined ? "white" : Colors.active
      // color: Colors.active
    }
  ];

  return (
    <>
      <TouchableScale onPress={handleOnPress}>
        <SuperEllipseMask style={styles.buttonMask} radius={BORDER_RADIUS}>
          <BlurView blurType="light" style={buttonStyle}>
            <Text style={textStyle}>{!joined ? "Join" : "Leave"}</Text>
          </BlurView>
        </SuperEllipseMask>
      </TouchableScale>
      <Text style={[styles.header, TextStyles.headerWhite]}>LOCATION</Text>

      <MapCard
        active
        loading={!open}
        style={styles.mapCard}
        userLocation={userLocation}
        markers={[{ coords: moveLocation, active: true, key: "location" }]}
      />

      {loading ? (
        <LoadingCircle style={styles.loading} size={20} />
      ) : (
        <>
          <Text style={[styles.header, TextStyles.headerWhite]}>GOING</Text>
          <SuperEllipseMask style={styles.joinedUsersContainer} radius={BORDER_RADIUS}>
            <FlatList
              data={users}
              renderItem={_renderItem}
              ItemSeparatorComponent={_renderSeparator}
              // ListHeaderComponent={_renderHeader}
              keyExtractor={_keyExtractor}
            />
          </SuperEllipseMask>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mapCard: {
    marginTop: CARD_GUTTER
  },
  header: {
    paddingTop: 10,
    paddingLeft: 10
  },
  loading: {
    alignSelf: "center",
    marginTop: 50
  },
  buttonMask: {
    marginVertical: CARD_GUTTER,
    marginHorizontal: 15
  },
  joinButton: {
    // marginVertical: CARD_GUTTER,
    // marginHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  joinedUsersContainer: {
    backgroundColor: "white",
    marginVertical: CARD_GUTTER
  },
  separator: {
    width: SCREEN_WIDTH - 24.5,
    marginLeft: 24.5,
    height: 1,
    backgroundColor: Colors.lightGray
  }
});

export default ActiveFocus;
