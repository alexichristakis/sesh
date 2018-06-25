import React, { Component } from "react";
import { StyleSheet, Animated, View, Text } from "react-native";

import Interactable from "react-native-interactable";
import { BlurView } from "react-native-blur";
import SuperEllipseMask from "react-native-super-ellipse-mask";

import { FillAbsolute } from "../lib/styles";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../lib/constants";

class Drawer extends Component {
  handleHideDrawer = () => {
    this.interactable.snapTo({ index: 2 });
  };

  handleShowDrawer = () => {
    this.interactable.snapTo({ index: 1 });
  };

  render() {
    return (
      <View style={FillAbsolute} pointerEvents={"box-none"}>
        <Interactable.View
          ref={view => (this.interactable = view)}
          // style={AbsoluteFill}
          verticalOnly={true}
          snapPoints={[{ y: 40 }, { y: SCREEN_HEIGHT - 100 }, { y: SCREEN_HEIGHT }]}
          boundaries={{ top: -300 }}
          initialPosition={{ y: SCREEN_HEIGHT - 100 }}
          // animatedValueY={this._deltaY}
        >
          <SuperEllipseMask radius={{ topRight: 15, topLeft: 15 }}>
            <BlurView
              blurType={"xlight"}
              blurAmount={15}
              style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            >
              <View style={{ width: SCREEN_WIDTH, height: 500 }}>
                <Text>I'm a drawer!!</Text>
              </View>
            </BlurView>
          </SuperEllipseMask>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef"
  },
  panel: {
    flex: 1
  }
});

export default Drawer;
