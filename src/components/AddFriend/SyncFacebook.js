import React from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import Icon from "react-native-vector-icons/Entypo";

import TouchableScale from "../global/TouchableScale";

import { BORDER_RADIUS, CARD_GUTTER } from "../../lib/constants";
import { Colors, TextStyles } from "../../lib/styles";

const GroupNameCard = () => {
  return (
    <TouchableScale style={{ marginTop: CARD_GUTTER }} onPress={() => console.log("yo")}>
      <SuperEllipseMask style={styles.card} radius={BORDER_RADIUS}>
        <Text style={TextStyles.header}>
          sync <Icon name="facebook" size={20} color={"black"} />
        </Text>
      </SuperEllipseMask>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10
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

export default GroupNameCard;