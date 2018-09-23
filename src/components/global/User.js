import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import Checkmark from "./Checkmark";
import ColorButton from "./ColorButton";

import { Colors, TextStyles } from "../../lib/styles";
import { GetThumbnailURL } from "../../lib/functions";
import { BORDER_RADIUS } from "../../lib/constants";

const ICON_SIZE = 35;

const User = ({ user, selectable, selected, request, onPressAccept, onPressDelete }) => {
  const indicatorStyle = {
    ...styles.indicator,
    backgroundColor: selected ? Colors.primary : "white",
    borderColor: selected ? Colors.primary : Colors.gray
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: GetThumbnailURL(user.fb_id) }} />
      <Text style={styles.name}>{user.name}</Text>
      {selectable && <View style={indicatorStyle} />}
      {request && (
        <View style={styles.buttonContainer}>
          <ColorButton
            title="Confirm"
            textStyle={TextStyles.bold}
            style={styles.button}
            borderRadius={5}
            onPress={() => onPressAccept(user.uid)}
            color={Colors.green}
          />
          <ColorButton
            title="Delete"
            textStyle={TextStyles.bold}
            style={styles.button}
            borderRadius={5}
            onPress={() => onPressDelete(user.uid)}
            color={Colors.red}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    paddingRight: 12
  },
  image: {
    // position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.gray,
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    width: ICON_SIZE
  },
  row: { flexDirection: "row" },
  name: {
    ...TextStyles.body,
    flex: 1,
    marginLeft: 10,
    alignSelf: "center"
  },
  time: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "300",
    color: Colors.gray
  },
  button: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderWidth: 1
    // marginHorizontal: 2.5
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  indicator: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 0.5
  }
});

export default User;
