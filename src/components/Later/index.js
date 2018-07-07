import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

import LaterMove from "./LaterMove";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";

class Later extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // MoveComponent: null
    };
  }

  transitionFrom = (source, onReturn, data) => {
    this.props.handleTransition({
      source,
      onReturn,
      data,
      active: false
    });
  };

  transitionFinished = (source, sharedData) => {
    // this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
  };

  _renderItem = ({ item, index }) => (
    <CardWrapper index={index} data={item} transitionFrom={this.transitionFrom}>
      <LaterMove
        onPressPresentOverlayTo={this.props.onPressPresentOverlayTo}
        move={item}
        coords={this.props.data.coords}
      />
    </CardWrapper>
  );

  render() {
    const { moves } = this.props.data;
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <VerticalList
          // ref={item => (this.list = item)}
          data={moves}
          renderItem={this._renderItem}
          shortened={this.props.shortened}
          onScroll={this.props._vertOnScroll}
          _onScrollBegin={this.props._onScrollBegin}
          _onScrollEnd={this.props._onScrollEnd}
        />
      </View>
    );
  }
}

export default Later;
