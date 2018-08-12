import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, TRANSITION_DURATION } from "../../lib/constants";
import { Colors } from "../../lib/styles";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class VerticalList extends Component {
  constructor(props) {
    super(props);

    // this.animatedPadding = new Animated.Value(105);
    this.animatedOpacity = new Animated.Value(1);
    this.animatedTranslate = new Animated.Value(1);

    this.state = {
      shortened: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.shortened && nextProps.shortened) {
      this.setState({ shortened: true }, () => this.shortenPadding());
    } else if (this.state.shortened && !nextProps.shortened) {
      this.setState({ shortened: false }, () => this.lengthenPadding());
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.shortened === nextProps.shortened) return false;
    else return true;
  }

  _keyExtractor = item => item.id.toString();

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

  renderHeader = () => (
    <View
      pointerEvents={"none"}
      style={{ height: SB_HEIGHT === 40 ? 51 : 56, width: SCREEN_WIDTH }}
    />
  );

  render() {
    // console.log("vertical list rendered");
    // console.log("VerticalList props: ", this.props);

    let animatedStyle = {
      // paddingTop: SB_HEIGHT === 40 ? 63 : 68,
      transform: [
        {
          translateY: this.animatedTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [-61, 0]
          })
        }
      ]
      // opacity: this.animatedOpacity
      // opacity: this.animatedOpacity.interpolate({
      //   inputRange: [0, 0.7, 1],
      //   outputRange: [0, 0, 1]
      // })
    };

    return (
      <AnimatedFlatList
        style={[styles.list, animatedStyle]}
        contentContainerStyle={styles.content}
        data={this.props.data}
        renderItem={this.props.renderItem}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
        onScrollBeginDrag={this.props._onScrollBegin}
        onScrollEndDrag={this.props.onScrollEndDrag}
        keyExtractor={this._keyExtractor}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    // flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingTop: SB_HEIGHT === 40 ? 60 : 56,

    // position: "absolute",
    // top: SB_HEIGHT,
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,

    // paddingBottom: 70,
    // marginBottom: 35,
    // backgroundColor: Colors.lightGray
    backgroundColor: "transparent"
    // backgroundColor: "#979797"
  },
  content: {
    paddingBottom: 125
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

export default VerticalList;
