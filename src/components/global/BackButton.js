import React, { Component } from "react";
import { Animated, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

// import SuperEllipseMask from "react-native-super-ellipse-mask";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Icon from "react-native-vector-icons/Feather";
import { BlurView } from "react-native-blur";

import TouchableScale from "./TouchableScale";

import { Colors, shadow } from "../../lib/styles";

class BackButton extends Component {
  haptic = func => {
    ReactNativeHapticFeedback.trigger("impactLight");
    func;
  };

  render() {
    let icon = this.props.list ? "list" : "chevron-down";
    let blurStyle = {
      paddingVertical: this.props.list ? 5 : 0,
      paddingHorizontal: 20,
      borderRadius: 15
    };

    return (
      // <SuperEllipseMask radius={20}>
      <KeyboardAvoidingView behavior="position" enabled style={styles.button}>
        <TouchableScale onPress={() => this.haptic(this.props.onPressPop())}>
          <BlurView blurAmount={20} blurType="xlight" style={blurStyle}>
            <Icon name={icon} size={28} color={Colors.primary} />
          </BlurView>
        </TouchableScale>
      </KeyboardAvoidingView>
      // </SuperEllipseMask>
    );
  }
}

const styles = {
  button: {
    position: "absolute",
    paddingBottom: 30,
    bottom: 10,
    alignSelf: "center",
    // borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "transparent",
    ...shadow
  }
};

BackButton.propTypes = {
  onPressPop: PropTypes.func.isRequired
};

export default BackButton;
