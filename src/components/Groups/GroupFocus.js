import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import { Colors, SeparatorStyles, shadow } from "../../lib/styles";
import { SB_HEIGHT, SCREEN_WIDTH, CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";

import User from "../global/User";
import MapCard from "../global/MapCard";
import BackButton from "../global/BackButton";
import Group from "./Group";

const DATA = [
  {
    id: "1",
    name: "Alexi Christakis",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "2",
    name: "William Oles",
    size: 105,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "3",
    name: "Michelle Li",
    size: 6,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "4",
    name: "Janvi Trivedi",
    size: 63,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "5",
    name: "Max Golden",
    size: 105,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "6",
    name: "Laszlo Gendler",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  }
];

class GroupFocus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: DATA,
      renderedData: DATA,
      loading: true,
      listOpen: false,
      changedName: false,
      newName: ""
    };
  }

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item, index }) => <User user={item} />;

  _renderSeparator = () => <View style={SeparatorStyles.users} />;

  render() {
    return (
      <SuperEllipseMask style={styles.container} radius={BORDER_RADIUS}>
        <FlatList
          data={DATA}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this._renderFooter}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={this._renderItem}
        />
      </SuperEllipseMask>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: CARD_GUTTER,
    backgroundColor: "white"
  },
  blur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: SB_HEIGHT,
    paddingHorizontal: CARD_GUTTER
  },
  header: {
    flex: 1,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  separatorContainer: {
    // width: SCREEN_WIDTH - 80,
    // marginLeft: 80,
    height: 1,
    backgroundColor: "white"
  },
  separator: {
    width: SCREEN_WIDTH - 24.5,
    marginLeft: 24.5,
    height: 1,
    backgroundColor: Colors.lightGray
  },
  footerContainer: {
    // flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  footerSeparator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 0.5,
    backgroundColor: Colors.gray
  },
  showMore: {
    color: Colors.groups,
    fontWeight: "bold",
    marginRight: 5
  }
});

export default GroupFocus;
