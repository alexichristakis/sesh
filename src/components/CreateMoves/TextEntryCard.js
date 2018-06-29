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

TextEntryCard = props => {
  return (
    <SuperEllipseMask radius={BORDER_RADIUS}>
      <View style={styles.card}>
        <TextInput placeholder={"What's going on?"} onChangeText={props.onChangeText} />
        <TouchableOpacity onPress={props.onPressDismiss}>
          <Icon
            style={{ alignSelf: "center" }}
            name={"chevron-down"}
            size={20}
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
    paddingTop: 20
  }
});

export default TextEntryCard;
