import React, { Component } from "react";
import { StyleSheet, Easing, Animated, TouchableOpacity, View, Text, Image } from "react-native";

import Interactable from "react-native-interactable";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import Icon from "react-native-vector-icons/Feather";
import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";

import ColorButton from "../global/ColorButton";

import { FacebookLogout, Test } from "../../api";

import { Colors, FillAbsolute } from "../../lib/styles";
import { SB_HEIGHT, SCREEN_HEIGHT, BORDER_RADIUS } from "../../lib/constants";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);
  }

  componentDidMount() {
    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
    }, 5);
  }

  dismiss = () => {
    this.interactable.snapTo({ index: 0 });
  };

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 0) {
      // Navigation.dismissOverlay(this.props.componentId);
      Navigation.dismissModal(this.props.componentId);
    }
  };

  handleOnPressSignOut = () => {
    FacebookLogout().then(() => {
      Navigation.pop("Component3");
      Navigation.dismissModal("Component6");
      Navigation.dismissModal("Component9");
    });
  };

  handleOnPressReportIssue = () => {
    Test().then(() => console.log("success!"));
    // Navigation.showModal({
    //   component: {
    //     name: "sesh.AddMember",
    //     passProps: { name: this.props.name, id: this.props.id }
    //   }
    // });
  };

  render() {
    let animatedOpacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SCREEN_HEIGHT / 2 - 100, SCREEN_HEIGHT],
        outputRange: [1, 0]
      })
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity style={FillAbsolute} activeOpacity={0.9} onPress={this.dismiss}>
          <Animated.View style={[styles.background, animatedOpacity]} />
        </TouchableOpacity>
        <Interactable.View
          animatedNativeDriver
          verticalOnly
          ref={Interactable => (this.interactable = Interactable)}
          snapPoints={[
            { y: SCREEN_HEIGHT, damping: 0.5, tension: 600 },
            { y: SCREEN_HEIGHT / 2 - 100, damping: 0.5, tension: 600 }
          ]}
          onSnap={this.handleOnSnap}
          initialPosition={{ y: SCREEN_HEIGHT }}
          animatedValueY={this.deltaY}
        >
          <SuperEllipseMask style={styles.interactable} radius={20}>
            <Text style={styles.name}>Settings</Text>
            <ColorButton
              textStyle={styles.textStyle}
              title={"sign out"}
              color={Colors.primary}
              onPress={this.handleOnPressSignOut}
            />
            <ColorButton
              textStyle={styles.textStyle}
              title={"report issue"}
              color={Colors.primary}
              onPress={this.handleOnPressReportIssue}
            />
            <TouchableOpacity
              style={{ alignSelf: "center", paddingTop: 10 }}
              onPress={this.dismiss}
            >
              <Text style={{ color: Colors.primary, fontSize: 16 }}>cancel</Text>
            </TouchableOpacity>
          </SuperEllipseMask>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50
  },
  background: {
    ...FillAbsolute,
    backgroundColor: "rgba(130,130,130,0.4)"
  },
  interactable: {
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20
  },
  name: {
    alignSelf: "center",
    color: Colors.primary,
    fontSize: 20,
    marginBottom: 10
  },
  textStyle: {
    fontSize: 14
  }
});

export default Settings;
