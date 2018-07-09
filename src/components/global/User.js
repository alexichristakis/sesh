import React, { Component } from "react";
import {
  LayoutAnimation,
  Easing,
  Animated,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import { Navigation } from "react-native-navigation";
import SuperEllipseMask from "react-native-super-ellipse-mask";

// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";
import { BORDER_RADIUS } from "../../lib/constants";

const ICON_SIZE = 35;

const User = props => {
  const user = props.data;

  let borderRadius = {
    topLeft: props.index === 0 ? BORDER_RADIUS : 0,
    topRight: props.index === 0 ? BORDER_RADIUS : 0
  };

  return (
    <SuperEllipseMask radius={borderRadius}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log(props.index);
        }}
      >
        <Image style={styles.image} source={{ uri: user.photo }} />
        <Text style={styles.name}>{user.name}</Text>
      </TouchableOpacity>
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
    padding: 5
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
    flex: 1,
    marginLeft: 10,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "300"
    // color: Colors.active,
  },

  time: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "300",
    color: Colors.gray
  }
});

export default User;
