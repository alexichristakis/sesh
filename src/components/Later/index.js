import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

import Move from "../global/Move";
import VerticalList from "../global/VerticalList";

const Later = ({ user, moves, handleTransition, onScroll, onScrollEndDrag }) => {
  transitionFrom = (dimensions, onReturn, cardData) => {
    handleTransition({
      ...dimensions,
      onReturn,
      cardData,
      isActive: false
    });
  };

  transitionFinished = (source, sharedData) => {
    // this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
  };

  _renderItem = ({ item, index }) => (
    <Move index={index} move={item} userLocation={user.location} transitionFrom={transitionFrom} />
  );

  return (
    <View style={styles.container}>
      <VerticalList
        data={moves}
        renderItem={_renderItem}
        // shortened={props.shortened}
        onScroll={onScroll}
        onScrollEndDrag={onScrollEndDrag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default Later;
