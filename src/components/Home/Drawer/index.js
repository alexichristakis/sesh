import React, { Component } from "react";
import { Easing, Animated, View } from "react-native";

import { Navigation } from "react-native-navigation";
import Interactable from "react-native-interactable";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import ActionButtonContainer from "./ActionButtonContainer";
import OpenContent from "./OpenContent";

import { FillAbsolute, shadow } from "../../../lib/styles";
import { SCREEN_HEIGHT, SB_HEIGHT, DRAWER_HEIGHT } from "../../../lib/constants";

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);
    this.state = {
      open: false,
      transitioning: false
    };
  }

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 1) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false, transitioning: false });
    }
  };

  handleOnDrag = event => {
    this.setState({ transitioning: true });
  };

  toggleDrawer = () => {
    this.setState({ transitioning: true }, () => {
      let index = this.state.open ? 0 : 1;
      ReactNativeHapticFeedback.trigger("impactLight");
      this.interactable.snapTo({ index });
    });
  };

  showProfileScreen = () => {
    this.interactable.snapTo({ index: 0 });
    Navigation.showModal({
      component: {
        name: "sesh.Profile",
        passProps: { user: this.props.user, data: this.props.data },
        options: {
          modalPresentationStyle: "fullScreen"
        }
      }
    });
  };

  render() {
    const { user, data } = this.props;
    const { groups, moves, coords } = data;

    let blurOpacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT, SCREEN_HEIGHT / 2, (3 * SCREEN_HEIGHT) / 4, SCREEN_HEIGHT],
        outputRange: [1, 0.2, 0, 0]
      })
    };

    const closed = { y: SCREEN_HEIGHT - DRAWER_HEIGHT + 10 };
    const open = { y: -DRAWER_HEIGHT + SB_HEIGHT + 15 };

    return (
      <View style={FillAbsolute} pointerEvents={"box-none"}>
        {(this.state.transitioning || this.state.open) && (
          <Animated.View
            pointerEvents={"none"}
            style={[blurOpacity, FillAbsolute, { backgroundColor: "rgba(0,0,0,0.8)" }]}
          />
        )}
        <Interactable.View
          animatedNativeDriver
          ref={view => (this.interactable = view)}
          verticalOnly={true}
          snapPoints={[closed, open]}
          onSnap={this.handleOnSnap}
          onDrag={this.handleOnDrag}
          boundaries={{
            top: open.y - 10,
            bottom: closed.y + 20,
            haptics: true
          }}
          initialPosition={closed}
          animatedValueY={this.deltaY}
        >
          <ActionButtonContainer
            deltaY={this.deltaY}
            toggleDrawer={this.toggleDrawer}
            groups={groups}
            open={this.state.open}
          />
          <OpenContent
            deltaY={this.deltaY}
            toggleDrawer={this.toggleDrawer}
            showProfileScreen={this.showProfileScreen}
            open={this.state.open}
            moves={moves}
            user={user}
            userLocation={coords}
          />
        </Interactable.View>
      </View>
    );
  }
}

export default Drawer;
