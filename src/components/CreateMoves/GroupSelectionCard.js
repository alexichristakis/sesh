import React, { Component } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import Group from "../Groups/Group";

import { SCREEN_WIDTH, BORDER_RADIUS } from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

const DATA = [
  {
    id: "1",
    name: "9pack",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "2",
    name: "Fence Club",
    size: 105,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "3",
    name: "Splash Bros",
    size: 6,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "4",
    name: "Frisbee",
    size: 63,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "5",
    name: "Fence Club",
    size: 105,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "6",
    name: "9pack",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "7",
    name: "9pack",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "8",
    name: "9pack",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "9",
    name: "9pack",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "10",
    name: "9pack",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  }
];

class GroupSelectionCard extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   selectedIndex: null
  //   // };
  // }
  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => this.props.onPressSelect(index)}>
      <Group selectable data={item} selected={this.props.selectedIndex === index} />
    </TouchableOpacity>
  );

  _renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <SuperEllipseMask radius={BORDER_RADIUS}>
        <FlatList
          scrollEnabled={false}
          style={{ backgroundColor: "white" }}
          data={DATA}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          keyExtractor={this._keyExtractor}
        />
      </SuperEllipseMask>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    width: SCREEN_WIDTH - 15,
    marginLeft: 15,
    height: 1.5,
    backgroundColor: Colors.mediumGray
  }
});

export default GroupSelectionCard;
