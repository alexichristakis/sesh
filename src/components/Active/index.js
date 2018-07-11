import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "~/lib/styles";

import ActiveMove from "./ActiveMove";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";
import LoadingCircle from "../global/LoadingCircle";

class Active extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinedMoves: []
    };
  }

  transitionFrom = (dimensions, onReturn, data) => {
    let joined = this.state.joinedMoves.includes(data.id);
    this.props.handleTransition({
      ...dimensions,
      onReturn,
      data,
      joined,
      active: true,
      joinMove: this.joinMove,
      leaveMove: this.leaveMove
    });
  };

  _renderItem = ({ item, index }) => (
    <CardWrapper active index={index} data={item} transitionFrom={this.transitionFrom}>
      <ActiveMove move={item} coords={this.props.data.coords} />
    </CardWrapper>
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
        _vertOnScroll={this.props._vertOnScroll}
        _onScrollBegin={this.props._onScrollBegin}
        _onScrollEnd={this.props._onScrollEnd}
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
