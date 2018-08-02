import React, { Component } from "react";
import { StyleSheet, Animated, View, Text, Image, Button } from "react-native";

import { Navigation } from "react-native-navigation";

import Header from "./Header";
import Groups from "../Groups";

import { SCREEN_WIDTH, IS_X, CARD_GUTTER, REFRESH_OFFSET } from "../../lib/constants";
import { Colors, FillAbsolute } from "../../lib/styles";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.yOffset = new Animated.Value(0);

    this.state = {};
  }

  _onScroll = () =>
    Animated.event([{ nativeEvent: { contentOffset: { y: this.yOffset } } }], {
      useNativeDriver: true
    });

  componentDidMount() {
    this.yOffset.addListener(() => {});
  }

  componentWillUnmount() {
    this.yOffset.removeAllListeners();
  }

  handleScrollRelease = event => {
    const { changedTouches, locationY, pageY } = event.nativeEvent;
    if (this.yOffset._value < -75) {
      Navigation.dismissModal(this.props.componentId);
    }
  };

  render() {
    const { user, data } = this.props;
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 150 }}
          onScroll={this._onScroll()}
          onResponderRelease={this.handleScrollRelease}
          scrollEventThrottle={16}
        >
          <Groups data={data.groups} />
        </Animated.ScrollView>
        <Header user={user} offset={this.yOffset} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.activeBackground1
  },
  scroll: {
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: CARD_GUTTER
  }
});

export default Profile;
