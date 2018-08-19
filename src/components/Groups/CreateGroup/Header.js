import React from "react";
import { Animated, StyleSheet, View, Text, TextInput } from "react-native";

import { SB_HEIGHT } from "../../../lib/constants";
import { Colors } from "../../../lib/styles";

const Header = ({ onChangeName }) => {
  return (
    <View style={styles.container}>
      {/* <Text>Create Group</Text> */}
      <TextInput
        autoFocus
        style={styles.text}
        placeholder={"group name"}
        onChangeText={onChangeName}
      />
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
    paddingLeft: 10,
    backgroundColor: Colors.groupsHeader1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});

export default Header;
