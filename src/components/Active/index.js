import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import LinearGradient from "react-native-linear-gradient";

import { Colors, TextStyles } from "../../lib/styles";
import { BORDER_RADIUS, CARD_GUTTER } from "../../lib/constants";

import VerticalList from "../global/VerticalList";
import Move from "../global/Move";

const Active = ({ user, moves, handleTransition, onScroll, onScrollEndDrag }) => {
  const data = moves.filter(move => move.time <= Date.now()).sort((a, b) => b.time - a.time);

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

   _emptyList = () => (
    <SuperEllipseMask style={styles.emptyCardContainer} radius={BORDER_RADIUS}>
      <Text style={TextStyles.body}>
        No active moves! Create one to let your friends know what's going on now.
      </Text>
    </SuperEllipseMask>
  );

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
      data={data}
      renderItem={_renderItem}
      // shortened={props.shortened}
      onScroll={onScroll}
      onScrollEndDrag={onScrollEndDrag}
      ListEmptyComponent={_emptyList}
    />
  );
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  emptyCardContainer: {
    marginHorizontal: CARD_GUTTER,
    backgroundColor: "white",
    padding: 20
  }
});

export default Active;
