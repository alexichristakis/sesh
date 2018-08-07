import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

import Move from "../global/Move";
import VerticalList from "../global/VerticalList";

class Later extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // MoveComponent: null
    };
  }

  transitionFrom = (dimensions, onReturn, data) => {
    this.props.handleTransition({
      ...dimensions,
      onReturn,
      data,
      active: false
    });
  };

  transitionFinished = (source, sharedData) => {
    // this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
  };

  _renderItem = ({ item, index }) => (
    <Move
      index={index}
      move={item}
      coords={this.props.data.coords}
      transitionFrom={this.transitionFrom}
    />
  );

  render() {
    const { moves } = this.props.data;
    return (
      <View style={styles.container}>
        <VerticalList
          data={moves}
          renderItem={this._renderItem}
          shortened={this.props.shortened}
          _vertOnScroll={this.props._vertOnScroll}
          _onScrollBegin={this.props._onScrollBegin}
          _onScrollEnd={this.props._onScrollEnd}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default Later;
