import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

import LaterMove from "./LaterMove";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";
import Transition from "../global/Transition";

const data = [
  {
    id: "alexi1",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    location: "0.24mi",
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "alexi2",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    location: "0.24mi",
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "alexi3",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    location: "0.24mi",
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "alexi4",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    location: "0.24mi",
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "alexi5",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    location: "0.24mi",
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "alexi6",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    location: "0.24mi",
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "alexi7",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    location: "0.24mi",
    photo: "https://graph.facebook.com/1825693684117541/picture"
  }
];

class Later extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MoveComponent: null
    };
  }

  transitionFrom = (source, onReturn, data, MoveComponent) => {
    this.props.clearScreen();
    this.transition.beginTransition(MoveComponent, source, onReturn, data, {
      onPressPresentOverlayTo: this.props.onPressPresentOverlayTo
    });
  };

  transitionFinished = (source, sharedData) => {
    // this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
  };

  _renderItem = ({ item, index }) => (
    <CardWrapper data={item} transitionFrom={this.transitionFrom}>
      <LaterMove move={item} />
    </CardWrapper>
  );

  render() {
    const { openProgress } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <VerticalList
          // ref={item => (this.list = item)}
          data={data}
          renderItem={this._renderItem}
          shortened={this.props.shortened}
          onScroll={this.props._vertOnScroll}
        />
        <Transition
          ref={item => (this.transition = item)}
          destinationPage={"sesh.LaterFocus"}
          transitionFinished={this.transitionFinished}
          returnScreen={this.props.returnScreen}
          onPressPushTo={this.props.onPressPresentOverlayTo}
          MoveComponent={this.state.MoveComponent}
        />
      </View>
    );
  }
}

export default Later;
