import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import { Navigation } from "react-native-navigation";

import Group from "./Group";

import { TransparentModalTo } from "../../lib/functions";
import { SCREEN_WIDTH, BORDER_RADIUS } from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

const Groups = props => {
  console.log(props);

  handleOnPressGroup = group => {
    TransparentModalTo("sesh.Focus", {
      groups: true,
      data: { name: group.name, size: 12 }
    });
  };

  handleOnPressCreateGroup = () => {
    Navigation.showModal({
      component: "groups.CreateGroup"
    });
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

  _renderSeparator = () => <View style={styles.separator} />;

  _renderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Press '+' to create a group! 🎉</Text>
    </View>
  );

  _keyExtractor = item => item.id.toString();

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Groups:</Text>
        <TouchableOpacity onPress={this.handleOnPressCreateGroup}>
          <Icon name={"plus"} size={30} color={"white"} />
        </TouchableOpacity>
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
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 5
  },
  header: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  listBackground: {
    backgroundColor: "white"
  },
  separator: {
    width: SCREEN_WIDTH - 15,
    marginLeft: 15,
    height: 1,
    backgroundColor: Colors.mediumGray
  },
  footerContainer: {
    borderTopWidth: 0.5,
    borderColor: Colors.mediumGray,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20
  }
});

export default Groups;
