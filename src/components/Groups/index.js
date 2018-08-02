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

import Group from "./Group";

import { TransparentModalTo } from "../../lib/functions";
import { SCREEN_WIDTH, BORDER_RADIUS } from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

const Groups = props => {
  console.log(props);

  handleGroupOnPress = group => {
    TransparentModalTo("sesh.Focus", {
      groups: true,
      data: { name: group.name, size: 12 }
    });
  };

  _renderItem = ({ item, index }) => (
    <TouchableHighlight
      style={{ backgroundColor: "white" }}
      activeOpacity={0.8}
      underlayColor={Colors.mediumGray}
      onPress={() => handleGroupOnPress(item)}
    >
      <Group data={item} />
    </TouchableHighlight>
  );

  _renderSeparator = () => <View style={styles.separator} />;

  _keyExtractor = item => item.id.toString();

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Groups:</Text>
        <TouchableOpacity>
          <Icon name={"plus"} size={30} color={"white"} />
        </TouchableOpacity>
      </View>

      <SuperEllipseMask radius={BORDER_RADIUS}>
        <FlatList
          scrollEnabled={false}
          style={{ backgroundColor: "white" }}
          data={props.data}
          renderItem={_renderItem}
          ItemSeparatorComponent={_renderSeparator}
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
  separator: {
    width: SCREEN_WIDTH - 15,
    marginLeft: 15,
    height: 1,
    backgroundColor: Colors.mediumGray
  }
});

export default Groups;
