import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";
import LinearGradient from "react-native-linear-gradient";

import { SB_HEIGHT } from "../../lib/constants";
import { Colors } from "../../lib/styles";

import Group from "./Group";
import Background from "../global/Background";
import BackButton from "../global/BackButton";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";
import Transition from "../global/Transition";

const data = [
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
      sharedData: {},
      MoveComponent: null
    };
  }

  transitionFrom = (source, onReturn, data, MoveComponent) => {
    this.setState({ MoveComponent: MoveComponent, sharedData: data });
    this.transition.openCard(source, onReturn, data, {
      changeName: this.changeGroupName
    });
  };

  transitionFinished = (source, sharedData) => {
    // this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
  };

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item, index }) => (
    <CardWrapper data={item} transitionFrom={this.transitionFrom}>
      <Group index={index} data={item} />
    </CardWrapper>
  );

  _renderHeader = () => <Text style={styles.header}>Groups</Text>;

  changeGroupName = newName => {
    const newData = { ...this.state.sharedData, name: newName };
    this.setState({ MoveComponent: <Group data={newData} /> });
    data.forEach(group => {
      if (group.id === newData.id) group.name = newData.name;
    });
  };

  onPressPushTo = (componentName, props, options) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: componentName,
        passProps: props,
        options: options
      }
    });
  };

  render() {
    return (
      <Background>
        <FlatList
          style={styles.container}
          data={data}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
        />
        <Transition
          groups
          ref={item => (this.transition = item)}
          destinationPage={"sesh.GroupFocus"}
          transitionFinished={this.transitionFinished}
          onPressPushTo={this.onPressPushTo}
          MoveComponent={this.state.MoveComponent}
        />

        <BlurView blurType="xlight" style={styles.statusBar} />

        <BackButton
          onPressPop={() => Navigation.dismissModal(this.props.componentId)}
        />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: 40
  },
  header: {
    paddingTop: SB_HEIGHT,
    paddingBottom: 10,
    paddingHorizontal: 20,
    // color: "white",
    fontSize: 28,
    fontWeight: "900"
  },
  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SB_HEIGHT
  }
});

export default Groups;
