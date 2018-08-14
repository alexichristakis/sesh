import React, { Component } from "react";
import { Animated, StyleSheet, View, FlatList, Text } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import LinearGradient from "react-native-linear-gradient";

import { BORDER_RADIUS, CARD_GUTTER } from "../../lib/constants";
import { Colors, TextStyles } from "../../lib/styles";

import Move from "../global/Move";
import VerticalList from "../global/VerticalList";

const Later = ({ user, moves, handleTransition, onScroll, onScrollEndDrag }) => {
  const data = moves.filter(move => move.time > Date.now()).sort((a, b) => a.time - b.time);

  transitionFrom = (dimensions, onReturn, cardData) => {
    handleTransition({
      ...dimensions,
      onReturn,
      cardData,
      isActive: false
    });
  };

  _renderItem = ({ item, index }) => (
    <Move index={index} move={item} userLocation={user.location} transitionFrom={transitionFrom} />
  );

  _emptyList = () => (
    <SuperEllipseMask style={styles.emptyCardContainer} radius={BORDER_RADIUS}>
      <Text style={TextStyles.body}>
        No later moves! Create one to let your friends know what's going on later.
      </Text>
    </SuperEllipseMask>
  );

  return (
    <View style={styles.container}>
      <VerticalList
        data={data}
        renderItem={_renderItem}
        // shortened={props.shortened}
        onScroll={onScroll}
        onScrollEndDrag={onScrollEndDrag}
        ListEmptyComponent={_emptyList}
      />
    </View>
  );
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

export default Later;
