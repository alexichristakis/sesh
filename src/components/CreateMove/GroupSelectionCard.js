import React from "react";
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import Group from "../Groups/Group";

import { SCREEN_WIDTH, BORDER_RADIUS, CARD_GUTTER } from "../../lib/constants";
import { Colors, SeparatorStyles } from "../../lib/styles";
import { ShowCreateGroup } from "../../lib/navigation";

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

  renderCreateGroupButton = () => (
    <TouchableHighlight
      onPress={ShowCreateGroup}
      underlayColor={Colors.mediumGray}
      style={styles.footerContainer}
    >
      <Text style={styles.footerText}>Create a group! 🎉</Text>
    </TouchableHighlight>
  );

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
        ListEmptyComponent={renderCreateGroupButton}
      />
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 15 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 5
  },
  listBackground: {
    backgroundColor: "white"
  },
  separator: {
    width: SCREEN_WIDTH - 15,
    marginLeft: 15,
    height: 1,
    backgroundColor: Colors.lightGray
  },
  footerContainer: {
    borderTopWidth: 0.5,
    borderColor: Colors.mediumGray,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20
  },
  footerText: {
    fontSize: 18,
    fontWeight: "300",
    color: Colors.gray
  }
});

export default GroupSelectionCard;
