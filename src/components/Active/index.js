import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

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

  transitionFrom = (source, onReturn, data) => {
    let joined = this.state.joinedMoves.includes(data.id);
    console.log(joined);

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
    <CardWrapper index={index} data={item} transitionFrom={this.transitionFrom}>
      <ActiveMove
        onPressPresentOverlayTo={this.props.onPressPresentOverlayTo}
        move={item}
        coords={this.props.data.coords}
      />
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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default Active;
