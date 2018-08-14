import React, { Component } from "react";
import { StyleSheet, Animated, View, Text, Image, Button } from "react-native";

import { Navigation } from "react-native-navigation";

import Parallax from "./Parallax";
import Header from "./Header";
import TopButtons from "./TopButtons";
import Notifications from "./Notifications";
import Groups from "../Groups";

import {} from "../../lib/navigation";

import { IS_X, CARD_GUTTER, REFRESH_OFFSET } from "../../lib/constants";
import { Colors, FillAbsolute } from "../../lib/styles";

const DATA = [
  {
    uid: 1,
    name: "Alexi Christakis",
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    uid: 2,
    name: "William Oles",
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    uid: 3,
    name: "Michelle Li",
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  }
];

class Profile extends Component {
  constructor(props) {
    super(props);

    this.yOffset = new Animated.Value(0);

    this.state = {
      notifications: DATA
    };
  }

  shouldComponentUpdate() {
    // return false;
    return true;
  }

  _onScroll = () =>
    Animated.event([{ nativeEvent: { contentOffset: { y: this.yOffset } } }], {
      useNativeDriver: true
    });

  showProfileSettings = () => {
    TransparentModalTo("profile.Settings");
  };

  showAddFriend = () => {
    Navigation.showModal({
      component: {
        name: "profile.AddFriend"
      }
    });
  };

  handleOnPressAcceptFriend = uid => {
    const { user } = this.props;
    console.log(user, " accepted ", uid);
  };

  handleOnPressDeleteRequest = uid => {
    const { user } = this.props;
    console.log(user, " deleted ", uid);
  };

  handleScrollEndDrag = ({ nativeEvent }) => {
    const { y } = nativeEvent.contentOffset;
    if (y < -75) Navigation.dismissModal(this.props.componentId);
    // console.log(event.nativeEvent);
  };

  render() {
    const { user, groups } = this.props;
    // console.log("groups: ", groups);
    console.log("update profile: ", this.props);
    const { notifications } = this.state;

    return (
      <View style={styles.container}>
        <Parallax
          user={user}
          offset={this.yOffset}
          showProfileSettings={this.showProfileSettings}
        />
        <Animated.ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          onScroll={this._onScroll()}
          onScrollEndDrag={this.handleScrollEndDrag}
          scrollEventThrottle={16}
        >
          <TopButtons />
          <Notifications
            data={notifications}
            acceptFriend={this.handleOnPressAcceptFriend}
            deleteRequest={this.handleOnPressDeleteRequest}
          />
          <Groups data={groups} />
        </Animated.ScrollView>
        <Header offset={this.yOffset} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.groupsHeader1
  },
  contentContainer: {
    paddingBottom: 250 + CARD_GUTTER,
    paddingHorizontal: CARD_GUTTER
  },
  scroll: {
    flex: 1,
    paddingTop: 250
  }
});

export default Profile;
