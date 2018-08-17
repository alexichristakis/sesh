import React, { Component } from "react";
import { Animated, View, StatusBar, setBarStyle, StyleSheet } from "react-native";

import codePush from "react-native-code-push";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

// import RNFS from "react-native-fs";

import LoadingCircle from "../global/LoadingCircle";
import Background from "./Background";
import Feed from "./Feed";
import Drawer from "./Drawer";
import TopBar from "./TopBar";

import { ShowMoveFocus } from "../../lib/navigation";
import { REFRESH_OFFSET } from "../../lib/constants";

/* import fetch functions */
import {} from "../../api";

import { IS_X } from "../../lib/constants";

/* to replace with data from firestore */
import GROUPS from "../../mock-data/GROUPS";
import MOVES from "../../mock-data/MOVES";
import FRIENDS from "../../mock-data/FRIENDS";
/*                                     */

const initialVertScroll = IS_X ? -44 : -20;
const xOffset = new Animated.Value(0);
const yOffset = new Animated.Value(initialVertScroll);

/* const user = {
  email,
  first_name,
  last_name,
  name,
  fb_id,
  uid,
  profile_pic
}; */

class Home extends Component {
  constructor(props) {
    super(props);

    // this.activeOffset = new Animated.Value(initialVertScroll);
    // this.laterOffset = new Animated.Value(initialVertScroll);

    this.state = {
      loading: true,
      refreshing: false,

      barOpen: true,
      focused: false
      // vertScrolling: false
    };
  }

  async componentDidMount() {
    const {
      userObj,
      attachListeners,
      setMoves,
      setUser,
      setLocation,
      setGroups,
      setFriends
    } = this.props;

    navigator.geolocation.getCurrentPosition(
      position => {
        const { coords } = position;
        // setLocation(coords);
        // setMoves(MOVES);
        // setGroups(GROUPS);
        // setFriends(FRIENDS);
        // setUser(userObj);

        setUser({ ...userObj, location: coords });
        attachListeners();

        this.setState({ loading: false });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (this.state.barOpen !== nextState.barOpen) return true;
    // else if (this.state.focused !== nextState.focused) return true;
    // if (this.state.loading !== nextState.loading) return true;
    // else if (this.state.refreshing !== nextState.refreshing) return true;
    // else return false;
    return true;
  }

  horizOnScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }], {
    useNativeDriver: true
  });

  vertOnScroll = Animated.event([{ nativeEvent: { contentOffset: { y: yOffset } } }], {
    useNativeDriver: true
  });

  // _onHorizScrollEnd = ({ nativeEvent }) => {
  //   const { x, y } = nativeEvent.contentOffset;
  //   if (xOffset._value === 0) {
  //     this.laterOffset = yOffset;
  //     // do some logic to fix the top bar scroll?
  //   } else {
  //     this.activeOffset = yOffset;
  //     // do some logic to fix the top bar scroll?
  //   }
  // };

  /* horizontal scroll control */
  _scrollToStart = () => this.hoScrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
  _scrollToEnd = () => this.hoScrollView.getNode().scrollToEnd();

  handleTransition = moveProps => {
    this.setState({ focused: true }, () =>
      ShowMoveFocus({
        props: { ...moveProps, returnScreen: () => this.setState({ focused: false }) }
      })
    );
  };

  handleOnVertScrollEndDrag = ({ nativeEvent }) => {
    const { y } = nativeEvent.contentOffset;
    if (y <= REFRESH_OFFSET && !this.state.refreshing) {
      ReactNativeHapticFeedback.trigger("impactHeavy");
      this.setState({ refreshing: true }, () => {
        setTimeout(() => {
          this.setState({ refreshing: false });
        }, 2000);
      });
    }
  };

  render() {
    const { refreshing, loading } = this.state;
    const { friends, groups, moves, user } = this.props;

    console.log("render home");
    return (
      <Background loading={loading || refreshing} xOffset={xOffset}>
        <StatusBar barStyle="light-content" />

        {loading ? (
          <LoadingCircle style={styles.loading} size={20} />
        ) : (
          <Feed
            user={user}
            moves={moves}
            handleTransition={this.handleTransition}
            onHoScroll={this.horizOnScroll}
            onVertScroll={this.vertOnScroll}
            onVertScrollEndDrag={this.handleOnVertScrollEndDrag}
            hoScrollRef={ScrollView => (this.hoScrollView = ScrollView)}
          />
        )}

        <TopBar
          user={user}
          yOffset={yOffset}
          xOffset={xOffset}
          refreshing={refreshing}
          barOpen={this.state.barOpen}
          scrollToStart={this._scrollToStart}
          scrollToEnd={this._scrollToEnd}
        />
        <Drawer loading={loading} user={user} moves={moves} />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    alignSelf: "center",
    marginTop: 150
  }
});

Home = codePush(Home);
export default Home;
