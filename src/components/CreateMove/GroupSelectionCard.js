import React from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import Group from "../Groups/Group";

import { SCREEN_WIDTH, BORDER_RADIUS } from "~/lib/constants";
import { Colors, shadow, FillAbsolute } from "~/lib/styles";

const GroupSelectionCard = props => {
  _renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => props.onPressSelect(index)}>
      <Group selectable data={item} selected={props.selectedIndex === index} />
    </TouchableOpacity>
  );

  _renderSeparator = () => <View style={styles.separator} />;

  _keyExtractor = item => item.id.toString();

  return (
    <SuperEllipseMask radius={BORDER_RADIUS}>
      <FlatList
        scrollEnabled={false}
        style={{ backgroundColor: "white" }}
        data={props.groups}
        renderItem={_renderItem}
        ItemSeparatorComponent={_renderSeparator}
        keyExtractor={_keyExtractor}
      />
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  separator: {
    width: SCREEN_WIDTH - 15,
    marginLeft: 15,
    height: 1,
    backgroundColor: Colors.mediumGray
  }
});

export default GroupSelectionCard;
