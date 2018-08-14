import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

import VerticalList from "../global/VerticalList";
import Move from "../global/Move";

const Active = ({ user, moves, handleTransition, onScroll, onScrollEndDrag }) => {
  transitionFrom = (dimensions, onReturn, cardData) => {
    // let joined = state.joinedMoves.includes(cardData.id);
    handleTransition({
      ...dimensions,
      onReturn,
      cardData,
      // joined,
      isActive: true
      // joinMove: this.joinMove,
      // leaveMove: this.leaveMove
    });
  };

  _renderItem = ({ item, index }) => (
    <Move
      active
      index={index}
      move={item}
      userLocation={user.location}
      transitionFrom={transitionFrom}
    />
  );

  // joinMove = moveId => {
  //   if (!this.state.joinedMoves.includes(moveId)) {
  //     this.setState({ joinedMoves: [...this.state.joinedMoves, moveId] });
  //     // make api call to join move
  //   }
  // };

  // leaveMove = moveId => {
  //   if (this.state.joinedMoves.includes(moveId)) {
  //     let index = this.state.joinedMoves.indexOf(moveId);
  //     this.setState({
  //       joinedMoves: [
  //         ...this.state.joinedMoves.slice(0, index),
  //         ...this.state.joinedMoves.slice(index + 1)
  //       ]
  //     });
  //     // make api call
  //   }
  // };

  // render() {
  // const { moves } = this.props;
  return (
    <VerticalList
      data={moves}
      renderItem={_renderItem}
      // shortened={props.shortened}
      onScroll={onScroll}
      onScrollEndDrag={onScrollEndDrag}
    />
  );
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default Active;
