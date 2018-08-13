import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

import VerticalList from "../global/VerticalList";
import Move from "../global/Move";

class Active extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinedMoves: []
    };
  }

  transitionFrom = (dimensions, onReturn, cardData) => {
    let joined = this.state.joinedMoves.includes(cardData.id);
    this.props.handleTransition({
      ...dimensions,
      onReturn,
      cardData,
      joined,
      isActive: true,
      joinMove: this.joinMove,
      leaveMove: this.leaveMove
    });
  };

  _renderItem = ({ item, index }) => (
    <Move
      active
      index={index}
      move={item}
      userLocation={this.props.user.location}
      transitionFrom={this.transitionFrom}
    />
  );

  joinMove = moveId => {
    if (!this.state.joinedMoves.includes(moveId)) {
      this.setState({ joinedMoves: [...this.state.joinedMoves, moveId] });
      // make api call to join move
    }
  };

  leaveMove = moveId => {
    if (this.state.joinedMoves.includes(moveId)) {
      let index = this.state.joinedMoves.indexOf(moveId);
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
      <VerticalList
        data={moves}
        renderItem={this._renderItem}
        shortened={this.props.shortened}
        onScroll={this.props.onScroll}
        onScrollEndDrag={this.props.onScrollEndDrag}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default Active;
