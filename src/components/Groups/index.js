import React, { Component } from "react";
import { Animated, StyleSheet, TouchableHighlight, View, FlatList, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

import { SCREEN_WIDTH, SB_HEIGHT } from "../../lib/constants";
import { Colors } from "../../lib/styles";

import Group from "./Group";
// import Background from "../global/Background";
import TouchableScale from "../global/TouchableScale";
import BackButton from "../global/BackButton";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";

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

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: DATA
    };
  }

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item, index }) => (
    <TouchableHighlight
      underlayColor={Colors.mediumGray}
      onPress={this.presentGroupFocusOverlay(item)}
    >
      <Group index={index} data={item} presentOverlay={this.props.presentOverlay} />
    </TouchableHighlight>
  );

  _renderSeparator = () => <View style={styles.separator} />;

  _renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>My Groups</Text>
      <TouchableScale onPress={() => this.props.presentModal("sesh.CreateGroup")}>
        <Icon style={{ paddingBottom: 8 }} name={"plus"} size={30} color={Colors.groups} />
      </TouchableScale>
    </View>
  );

  changeGroupName = (oldData, newName) => {
    console.log("changing!!");
    const newData = { ...oldData, name: newName };
    // this.setState({ MoveComponent: <Group data={newData} /> });
    console.log(newData);
    const data = this.state.data;
    console.log(data);
    data.forEach(group => {
      console.log(group);
      if (group.id === newData.id) {
        console.log("setting new state");
        group.name = newData.name;
        this.setState({ data: data });
        // break;
      }
    });
  };

  presentGroupFocusOverlay = item => () => {
    console.log("navigate!", item);
    ReactNativeHapticFeedback.trigger("impactLight");
    Navigation.showOverlay({
      component: {
        name: "sesh.GroupFocus",
        passProps: {
          data: item
        }
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.lightGray }}>
        <FlatList
          style={styles.list}
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={this._renderHeader}
        />

        <View style={[styles.statusBar]}>
          <SuperEllipseMask radius={{ bottomRight: 15, bottomLeft: 15 }}>
            <View
              style={{
                width: SCREEN_WIDTH,
                paddingTop: SB_HEIGHT,
                // paddingBottom: 15,
                paddingHorizontal: 15
              }}
            >
              <LinearGradient
                style={styles.statusBar}
                locations={[0.5, 1]}
                colors={[Colors.groupsHeader1, Colors.groupsHeader2]}
              />
              <BlurView blurType="light" style={styles.statusBar} />

              <View style={styles.headerContainer}>
                <Text style={styles.header}>My Groups</Text>
                <TouchableScale onPress={() => this.props.presentModal("sesh.CreateGroup")}>
                  <Icon style={{ paddingBottom: 8 }} name={"plus"} size={30} color={"white"} />
                </TouchableScale>
              </View>
            </View>
          </SuperEllipseMask>
        </View>

        <BackButton onPressPop={() => Navigation.dismissModal(this.props.componentId)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    // paddingLeft: 10,
    paddingTop: 40
  },
  headerContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    // paddingTop: SB_HEIGHT,
    paddingBottom: 10,
    color: "white",
    fontSize: 28,
    fontWeight: "800"
  },
  separator: {
    width: SCREEN_WIDTH - 15,
    marginLeft: 15,
    height: 1.5,
    backgroundColor: Colors.mediumGray
  },
  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SB_HEIGHT + 55
  }
});

export default Groups;
