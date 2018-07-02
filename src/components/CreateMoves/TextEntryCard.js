import React from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import Icon from "react-native-vector-icons/Feather";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  ANIMATION_DURATION,
  CARD_GUTTER,
  BORDER_RADIUS
} from "../../lib/constants";
import { Colors } from "../../lib/styles";

const TextEntryCard = props => {
  return (
    <SuperEllipseMask radius={BORDER_RADIUS}>
      <View style={styles.card}>
        <TextInput
          autoFocus
          allowFontScaling={false}
          style={styles.text}
          selectionColor={props.active ? Colors.activeBackground1 : Colors.laterBackground1}
          placeholder={"What's going on?"}
          onChangeText={props.onChangeText}
          keyboardAppearance={"dark"}
        />
        <TouchableOpacity style={{ height: 12 }} onPress={props.onPressDismiss}>
          <Icon
            style={{
              position: "absolute",
              top: -5,
              bottom: -5,
              transform: [{ scaleY: 0.5 }, { scaleX: 1.5 }],
              alignSelf: "center"
            }}
            name={"chevron-down"}
            size={28}
            color={Colors.mediumGray}
          />
        </TouchableOpacity>
      </View>
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
  text: {
    fontSize: 18
  }
});

export default TextEntryCard;
