import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  StatusBar,
  View,
  Text,
  Image,
  Button
} from "react-native";

import { Navigation } from "react-native-navigation";

import Parallax from "./Parallax";
import Header from "./Header";
import TopButtons from "./TopButtons";
import Notifications from "./Notifications";
import Groups from "../Groups";

import { TransparentModalTo } from "../../lib/functions";
import {
  SCREEN_WIDTH,
  SB_HEIGHT,
  IS_X,
  CARD_GUTTER,
  REFRESH_OFFSET
} from "../../lib/constants";
import { Colors, FillAbsolute } from "../../lib/styles";

const LIGHT = "light-content";
const DARK = "dark-content";

const notifications = [
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
      barStyle: LIGHT
    };
  }

  // componentDidMount() {
  //   this.yOffset.addListener(this.offsetListener);
  // }

  // componentWillUnmount() {
  //   this.yOffset.removeAllListeners();
  // }

  shouldComponentUpdate() {
    return false;
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

  showCreateGroup = () => {
    const { friends } = this.props.data;
    Navigation.showModal({
      component: {
        name: "groups.CreateGroup",
        passProps: {
          friends
        }
      }
    });
  };

  handleOnPressAcceptFriend = uid => {
    const { user } = this.props;
  };

  handleOnPressDeleteRequest = uid => {
    const { user } = this.props;
  };

  // handleScrollRelease = event => {
  //   const { changedTouches, locationY, pageY } = event.nativeEvent;
  //   if (this.yOffset._value < -75) {
  //     Navigation.dismissModal(this.props.componentId);
  //   }
  // };

  handleScrollEndDrag = ({ nativeEvent }) => {
    const { y } = nativeEvent.contentOffset;
    if (y < -75) Navigation.dismissModal(this.props.componentId);
    // console.log(event.nativeEvent);
  };

  // offsetListener = ({ value }) => {
  //   const { barStyle } = this.state;
  //   if (value >= 145 && barStyle === LIGHT)
  //     this.setState({ barStyle: DARK }, () => StatusBar.setBarStyle(DARK, true));
  //   else if (value < 145 && barStyle === DARK)
  //     this.setState({ barStyle: LIGHT }, () => StatusBar.setBarStyle(LIGHT, true));
  // };

  render() {
    const { user, data } = this.props;

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
          // onResponderRelease={this.handleScrollRelease}
          scrollEventThrottle={16}
        >
          <TopButtons
            onPressSettings={this.showProfileSettings}
            onPressAddFriend={this.showAddFriend}
            onPressCreateGroup={this.showCreateGroup}
          />
          <Notifications
            data={notifications}
            acceptFriend={this.handleOnPressAcceptFriend}
            deleteRequest={this.handleOnPressDeleteRequest}
          />
          <Groups data={data} />
        </Animated.ScrollView>
        <Header
          user={user}
          offset={this.yOffset}
          // showProfileSettings={this.showProfileSettings}
          // showAddFriend={this.showAddFriend}
        />
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
    paddingBottom: 250,
    paddingHorizontal: CARD_GUTTER
  },
  scroll: {
    flex: 1,
    paddingTop: 250
  }
});

export default Profile;
