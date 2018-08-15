import React from "react";
import {
  StyleSheet,
  StatusBar,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import { Navigation } from "react-native-navigation";
import { VibrancyView } from "react-native-blur";

import Group from "./Group";

import { ShowGroupFocus, ShowCreateGroup } from "../../lib/navigation";
import { SCREEN_WIDTH, BORDER_RADIUS } from "../../lib/constants";
import { Colors, TextStyles, SeparatorStyles } from "../../lib/styles";

const Groups = props => {
  handleOnPressGroup = group => {
    ShowGroupFocus({ group });
  };

  _renderItem = ({ item, index }) => (
    <TouchableHighlight
      style={{ backgroundColor: "white" }}
      activeOpacity={0.8}
      underlayColor={Colors.mediumGray}
      onPress={() => handleOnPressGroup(item)}
    >
      <Group data={item} />
    </TouchableHighlight>
  );

  _renderSeparator = () => <View style={SeparatorStyles.groups} />;

  _renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>My Groups:</Text>
      <TouchableOpacity onPress={ShowCreateGroup}>
        <Icon name={"plus"} size={30} color={Colors.gray} />
      </TouchableOpacity>
    </View>
  );

  _renderFooter = () => (
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={TextStyles.headerWhite}>MY GROUPS</Text>
      </View>
      <SuperEllipseMask radius={BORDER_RADIUS}>
        <FlatList
          scrollEnabled={false}
          style={styles.listBackground}
          data={props.data}
          renderItem={_renderItem}
          ItemSeparatorComponent={_renderSeparator}
          ListFooterComponent={_renderFooter}
          keyExtractor={_keyExtractor}
        />
      </SuperEllipseMask>
    </View>
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

export default Groups;
