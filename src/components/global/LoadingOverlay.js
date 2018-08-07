import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { BlurView } from "react-native-blur";
import SuperEllipseMask from "react-native-super-ellipse-mask";

import LoadingCircle from "./LoadingCircle";

import { FillAbsolute } from "../../lib/styles";
import { BORDER_RADIUS } from "../../lib/constants";

class LoadingOverlay extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <SuperEllipseMask style={styles.mask} radius={30}>
          <BlurView style={styles.blur}>
            <LoadingCircle size={25} />
          </BlurView>
        </SuperEllipseMask>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...FillAbsolute,
    alignItems: "center",
    justifyContent: "center"
  },
  mask: {
    justifyContent: "center"
  },
  blur: {
    alignSelf: "center",
    padding: 60
  }
});

export default LoadingOverlay;
