import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";
import PropTypes from "prop-types";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, TRANSITION_DURATION } from "../../lib/constants";
import { Colors } from "../../lib/styles";

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class VerticalList extends Component {
  constructor(props) {
    super(props);

    // this.animatedPadding = new Animated.Value(105);
    this.animatedOpacity = new Animated.Value(1);
    this.animatedTranslate = new Animated.Value(1);
  }

  _keyExtractor = item => item.id.toString();

  fadeOut = () => {
    Animated.timing(this.animatedOpacity, {
      toValue: 0,
      duration: TRANSITION_DURATION,
      // easing: Easing.ease,
      useNativeDriver: true
    }).start();
  };

  fadeIn = () => {
    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: TRANSITION_DURATION,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  };

  shortenPadding = () => {
    Animated.timing(this.animatedTranslate, {
      toValue: 0,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    }).start();
  };

  lengthenPadding = () => {
    Animated.timing(this.animatedTranslate, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  };

  renderSeparator = () => {
    const separatorHeight = 1;
    return (
      <View style={styles.separatorContainer}>
        <View style={styles.separatorBackground} />
        <View style={styles.separator} />
      </View>
    );
  };

  render() {
    let animatedStyle = {
      // paddingTop: SB_HEIGHT === 40 ? 63 : 68,
      transform: [
        {
          translateY: this.animatedTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [-70, 0]
          })
        }
      ],
      // opacity: this.animatedOpacity
      opacity: this.animatedOpacity.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0, 1]
      })
    };

    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.content}
          data={this.props.data}
          renderItem={this.props.renderItem}
          // ItemSeparatorComponent={this.renderSeparator}
          scrollEventThrottle={50}
          onScroll={this.props.onScroll}
          onScrollBeginDrag={this.props.onScrollBeginDrag}
          onScrollEndDrag={this.props.onScrollEndDrag}
          keyExtractor={this._keyExtractor}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.props.renderHeader}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    // flex: 1,
    paddingTop: SB_HEIGHT === 40 ? 63 : 68,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -80,

    // paddingBottom: 70,
    // marginBottom: 35,
    // backgroundColor: Colors.lightGray
    backgroundColor: "transparent"
    // backgroundColor: "#979797"
  },
  content: {
    paddingBottom: 120
  },
  separatorContainer: {
    width: SCREEN_WIDTH,
    marginVertical: 5,
    borderRadius: 1,
    height: 2
  },
  separatorBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2
    // backgroundColor: "white"
  },
  separator: {
    position: "absolute",
    top: 0,
    left: 80,
    right: 80,
    height: 2,
    backgroundColor: Colors.mediumGray
  }
});

VerticalList.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  onScroll: PropTypes.func,
  onScrollBeginDrag: PropTypes.func,
  onScrollEndDrag: PropTypes.func
};

export default VerticalList;
