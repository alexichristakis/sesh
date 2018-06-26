import React, { Component } from "react";
import { StyleSheet, Animated, View, TouchableOpacity, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import MapView, { Marker } from "react-native-maps";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

import TouchableScale from "../global/TouchableScale";
import Focus from "../global/Focus";
import MapCard from "../global/MapCard";
import User from "../global/User";
import ActiveMove from "./ActiveMove";

const data = [
  {
    key: "1",
    coords: {
      latitude: 47.675598,
      longitude: -122.263837
    },
    title: "9pack",
    description: "dinner in pierson college"
  },
  {
    key: "2",
    coords: {
      latitude: 47.679239,
      longitude: -122.267227
    },
    title: "Fence Club",
    description: "sesh"
  },
  {
    key: "3",
    coords: {
      latitude: 47.663461,
      longitude: -122.284221
    },
    title: "Splash Bros",
    description: "splashing around"
  }
];

class ActiveFocus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joined: this.props.joined,
      loading: true,
      position: null
    };
  }

  async componentDidMount() {
    // console.log("active focus mounted");
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ position: position, loading: false });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  onPressPop = () => {
    if (this.state.joined) this.props.joinMove(this.props.data.id);
    else this.props.leaveMove(this.props.data.id);

    this.focus.exit();
    setTimeout(() => {
      this.props.closeCard();
      // Navigation.pop(this.props.componentId);
      Navigation.dismissOverlay(this.props.componentId);
      // this.props.closeCard();
    }, 50);
  };

  handleOnPress = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.setState({ joined: !this.state.joined });
  };

  _renderItem = ({ item }) => <User data={item} />;

  _renderHeader = () => {
    let headerTopPadding = SB_HEIGHT === 20 ? 30 : 5;

    return (
      <View style={{ flex: 1 }}>
        <MapCard loading={this.props.transitioning} style={{ marginVertical: 5 }} markers={data} />
        <TouchableScale onPress={this.handleOnPress}>
          <SuperEllipseMask radius={10}>
            <View
              style={[
                styles.joinButton,
                {
                  backgroundColor: this.state.joined ? Colors.active : "white"
                }
              ]}
            >
              <Text
                style={[
                  styles.joinText,
                  {
                    color: this.state.joined ? "white" : Colors.active
                  }
                ]}
              >
                {!this.state.joined ? "Join" : "Leave"}
              </Text>
            </View>
          </SuperEllipseMask>
        </TouchableScale>
      </View>
    );
  };

  render() {
    return (
      <Focus
        active
        ref={item => (this.focus = item)}
        // data={data}
        renderHeader={this._renderHeader}
        optionButton={"end"}
        cardHeight={this.props.cardHeight}
        statusBarHeight={this.props.statusBarHeight}
        closeCard={this.props.closeCard}
        onPressPop={this.onPressPop}
        renderItem={this._renderItem}
      >
        {/* <ActiveMove
          blur
          index={this.props.index}
          length={this.props.length}
          move={this.props.data}
          onPressPresentOverlayTo={this.props.onPressPresentOverlayTo}
        /> */}
      </Focus>
    );
  }
}

const styles = StyleSheet.create({
  joinButton: {
    flex: 1,
    // marginVertical: 20,
    padding: 15,
    // borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
    // ...shadow,
  },
  joinText: {
    // flex: 1,
    // color: Colors.active,
    fontSize: 18
  }
});

export default ActiveFocus;
