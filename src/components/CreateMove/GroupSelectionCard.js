import React from "react";
import { FlatList, View, TouchableHighlight } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import Group from "../Groups/Group";

import { BORDER_RADIUS, CARD_GUTTER } from "../../lib/constants";
import { Colors, SeparatorStyles } from "../../lib/styles";

const GroupSelectionCard = ({ onPressSelect, selectedIndex, groups }) => {
  renderGroup = ({ item, index }) => (
    <TouchableHighlight
      style={{ backgroundColor: "white" }}
      activeOpacity={0.8}
      underlayColor={Colors.mediumGray}
      onPress={() => onPressSelect(index)}
    >
      <Group selectable data={item} selected={selectedIndex === index} />
    </TouchableHighlight>
  );

  renderSeparator = () => <View style={SeparatorStyles.groups} />;

  _keyExtractor = item => item.id.toString();

  return (
    <SuperEllipseMask
      style={{ marginVertical: CARD_GUTTER, backgroundColor: "white" }}
      radius={BORDER_RADIUS}
    >
      <FlatList
        scrollEnabled={false}
        data={groups}
        renderItem={renderGroup}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={_keyExtractor}
      />
    </SuperEllipseMask>
  );
};

export default GroupSelectionCard;
