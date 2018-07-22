import React from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import Icon from "react-native-vector-icons/Feather";

import { BORDER_RADIUS } from "../../lib/constants";
import { Colors } from "../../lib/styles";

const TextEntryCard = props => {
  return (
    <SuperEllipseMask style={styles.card} radius={BORDER_RADIUS}>
      <TextInput
        autoFocus
        allowFontScaling={false}
        style={styles.text}
        selectionColor={props.active ? Colors.activeBackground1 : Colors.laterBackground1}
        placeholder={props.active ? "What's going on now?" : "What's going on later?"}
        onChangeText={props.onChangeText}
        keyboardAppearance={"dark"}
      />
      <TouchableOpacity style={{ height: 12 }} onPress={props.onPressDismiss}>
        <Icon style={styles.icon} name={"chevron-down"} size={28} color={Colors.mediumGray} />
      </TouchableOpacity>
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5
  },
  icon: {
    position: "absolute",
    top: -5,
    bottom: -5,
    transform: [{ scaleY: 0.5 }, { scaleX: 1.5 }],
    alignSelf: "center"
  },
  text: {
    fontSize: 18
  }
});

export default TextEntryCard;
