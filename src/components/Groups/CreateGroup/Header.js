import React from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

import { SB_HEIGHT } from "../../../lib/constants";

const Header = props => {
  return (
    <View style={styles.container}>
      <Text>Create Group</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SB_HEIGHT + 50,
    paddingTop: SB_HEIGHT / 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Header;
