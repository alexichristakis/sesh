import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import TouchableScale from "../../global/TouchableScale";

import { Colors } from "../../../lib/styles";

const Footer = props => {
  return (
    <View style={styles.container}>
      <TouchableScale onPress={() => console.log("yo")} style={styles.button}>
        <Icon name={"chevron-right"} size={36} color={Colors.groupsHeader1} />
      </TouchableScale>
      {/* <Text>create group</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingBottom: 20,
    paddingRight: 10,
    backgroundColor: Colors.groupsHeader1
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
});

export default Footer;
