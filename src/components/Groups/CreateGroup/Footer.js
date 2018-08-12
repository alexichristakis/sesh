import React from "react";
import { StyleSheet, KeyboardAvoidingView, Text } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import TouchableScale from "../../global/TouchableScale";

import { Colors } from "../../../lib/styles";

const Footer = ({ onPressCreateGroup }) => {
  return (
    <KeyboardAvoidingView enabled behavior="position" style={styles.buttonContainer}>
      <TouchableScale onPress={onPressCreateGroup} style={styles.button}>
        <Icon name={"chevron-right"} size={36} color={"white"} />
      </TouchableScale>
      {/* <Text>create group</Text> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: 5,
    right: 10,
    paddingBottom: 20
  },
  button: {
    borderRadius: 30,
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.groupsHeader1
  }
});

export default Footer;
