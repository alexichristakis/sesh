import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

import ActiveMove from "./ActiveMove";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";
import Transition from "../global/Transition";

class Active extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinedMoves: []
    };
  }

  transitionFrom = (source, onReturn, data) => {
    let joined = this.state.joinedMoves.includes(data.id);

    this.props.handleTransition({
      source,
      onReturn,
      data,
      joined,
      active: true,
      joinMove: this.joinMove,
      leaveMove: this.leaveMove
    });
  };

  transitionFinished = (source, sharedData) => {
    // this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
  };

  _renderItem = ({ item, index }) => (
    <CardWrapper data={item} transitionFrom={this.transitionFrom}>
      <ActiveMove onPressPresentOverlayTo={this.props.onPressPresentOverlayTo} move={item} />
    </CardWrapper>
  );

  joinMove = move => {
    if (!this.state.joinedMoves.includes(move)) {
      this.setState({ joinedMoves: [...this.state.joinedMoves, move] });
      // make api call
    }
  };

  leaveMove = move => {
    if (this.state.joinedMoves.includes(move)) {
      let index = this.state.joinedMoves.indexOf(move);
      this.setState({
        joinedMoves: [
          ...this.state.joinedMoves.slice(0, index),
          ...this.state.joinedMoves.slice(index + 1)
        ]
      });
      // make api call
    }
  };

  render() {
    const { moves } = this.props.data;
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <VerticalList
          ref={item => (this.list = item)}
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

export default Active;
