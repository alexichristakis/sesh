import React, { Component } from "react";
import { Animated, View, StatusBar, StyleSheet } from "react-native";

import codePush from "react-native-code-push";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

// import RNFS from "react-native-fs";

import LoadingCircle from "../global/LoadingCircle";
import Background from "./Background";
import Drawer from "./Drawer";
import TopBar from "./TopBar";
import Active from "../Active";
import Later from "../Later";

import { TransparentModalTo } from "../../lib/functions";
import { SCREEN_WIDTH, IS_X, REFRESH_OFFSET } from "../../lib/constants";
import { Colors, FillAbsolute } from "../../lib/styles";

/* import fetch functions */
import {} from "../../api";

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
  display_name,
  id,
  uid,
  profile_pic
}; */

class Home extends Component {
  constructor(props) {
    super(props);

    this.activeOffset = new Animated.Value(initialVertScroll);
    this.laterOffset = new Animated.Value(initialVertScroll);

    xOffset.addListener(() => {});
    yOffset.addListener(this.handleRefresh);
    this.state = {
      loading: true,
      refreshing: false,

      barOpen: true,
      focused: false,
      vertScrolling: false,

      user: {
        ...this.props.user,
        photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
      },

      coords: { latitude: null, longitude: null },

      friends: FRIENDS,
      groups: GROUPS,
      moves: MOVES
    };
  }

  async componentDidMount() {
    const url = "https://graph.facebook.com/1779355238751386/picture?type=large";
    this.setState({ photo: url });
    // const path = RNFS.DocumentDirectoryPath + "/profile_pic.png";
    // //
    // await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
    // RNFS.readFile(path, "base64").then(res => {
    // 	console.log("finished");
    // 	this.setState({ photo: "data:image/png;base64," + res, loading: false });
    // });
    // console.log(res);

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ coords: position.coords, loading: false });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    xOffset.removeAllListeners();
    yOffset.removeAllListeners();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (this.state.barOpen !== nextState.barOpen) return true;
    // else if (this.state.focused !== nextState.focused) return true;
    if (this.state.loading !== nextState.loading) return true;
    else if (this.state.refreshing !== nextState.refreshing) return true;
    else return false;
  }

  _horizOnScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }], {
    useNativeDriver: true
  });

  _vertOnScroll = Animated.event([{ nativeEvent: { contentOffset: { y: yOffset } } }], {
    useNativeDriver: true
  });

  _onHorizScrollEnd = ({ nativeEvent }) => {
    const { x, y } = nativeEvent.contentOffset;
    if (xOffset._value === 0) {
      this.laterOffset = yOffset;
      // do some logic to fix the top bar scroll?
    } else {
      this.activeOffset = yOffset;
      // do some logic to fix the top bar scroll?
    }
  };

  /* horiz scroll control */
  _scrollToStart = () => this.scrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
  _scrollToEnd = () => this.scrollView.getNode().scrollToEnd();

  handleTransition = props => {
    this.setState({ focused: true }, () =>
      TransparentModalTo("sesh.Focus", {
        ...props,
        coords: this.state.coords,
        returnScreen: () => this.setState({ focused: false })
      })
    );
  };

  handleRefresh = event => {
    const { value } = event;
    if (value <= REFRESH_OFFSET && !this.state.refreshing) {
      ReactNativeHapticFeedback.trigger("impactHeavy");
      this.setState({ refreshing: true }, () => {
        setTimeout(() => {
          this.setState({ refreshing: false });
        }, 2000);
      });
    }
  };

  render() {
    const { friends, groups, moves, user, refreshing, coords, loading } = this.state;
    const data = { friends, groups, moves, coords };

    const Loading = <LoadingCircle style={styles.loading} size={20} />;

    const Feed = (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={ScrollView => (this.scrollView = ScrollView)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={this._horizOnScroll}
        onMomentumScrollEnd={this._onHorizScrollEnd}
        style={styles.scroll}
      >
        <Active
          shortened={!this.state.barOpen}
          handleTransition={this.handleTransition}
          _vertOnScroll={this._vertOnScroll}
          data={data}
        />
        <Later
          shortened={!this.state.barOpen}
          handleTransition={this.handleTransition}
          _vertOnScroll={this._vertOnScroll}
          data={data}
        />
      </Animated.ScrollView>
    );

    return (
      <Background loading={loading || refreshing} xOffset={xOffset}>
        <StatusBar barStyle="light-content" />

        {loading ? Loading : Feed}

        <TopBar
          yOffset={yOffset}
          xOffset={xOffset}
          refreshing={refreshing}
          barOpen={this.state.barOpen}
          scrollToStart={this._scrollToStart}
          scrollToEnd={this._scrollToEnd}
        />
        <Drawer loading={loading} user={user} data={data} />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: "row"
  },
  loading: {
    alignSelf: "center",
    marginTop: 150
  }
});

Home = codePush(Home);
export default Home;
