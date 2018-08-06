import React, { Component } from "react";
import { StyleSheet, Animated, View, Text, Image, Button } from "react-native";

import { Navigation } from "react-native-navigation";

import Header from "./Header";
import Groups from "../Groups";

import { TransparentModalTo } from "../../lib/functions";
import { SCREEN_WIDTH, SB_HEIGHT, IS_X, CARD_GUTTER, REFRESH_OFFSET } from "../../lib/constants";
import { Colors, FillAbsolute } from "../../lib/styles";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.yOffset = new Animated.Value(0);

    this.state = {};
  }

  componentDidMount() {
    this.yOffset.addListener(() => {});
  }

  componentWillUnmount() {
    this.yOffset.removeAllListeners();
  }

  _onScroll = () =>
    Animated.event([{ nativeEvent: { contentOffset: { y: this.yOffset } } }], {
      useNativeDriver: true
    });

  showProfileSettings = () => {
    TransparentModalTo("profile.Settings");
  };

  handleScrollRelease = event => {
    const { changedTouches, locationY, pageY } = event.nativeEvent;
    if (this.yOffset._value < -75) {
      Navigation.dismissModal(this.props.componentId);
    }
  };

  render() {
    const { user, data } = this.props;

    const animatedScrollStyle = {
      opacity: this.yOffset.interpolate({
        inputRange: [-100, -SB_HEIGHT, 50],
        outputRange: [0.7, 1, 1]
      })
    };

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={[styles.scroll, animatedScrollStyle]}
          contentContainerStyle={{ paddingBottom: 150 }}
          onScroll={this._onScroll()}
          onResponderRelease={this.handleScrollRelease}
          scrollEventThrottle={16}
        >
          <Groups data={data.groups} />
        </Animated.ScrollView>
        <Header user={user} offset={this.yOffset} showProfileSettings={this.showProfileSettings} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.groupsHeader1
  },
  scroll: {
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: CARD_GUTTER
  }
});

export default Profile;
