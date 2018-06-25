import React, { Component } from "react";
import { StyleSheet, Animated, View, Text } from "react-native";

import Interactable from "react-native-interactable";
import { BlurView } from "react-native-blur";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";

import TouchableScale from "./global/TouchableScale";

import { Colors, FillAbsolute } from "../lib/styles";
import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../lib/constants";

const BUTTON_SIZE = 50;

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
          snapPoints={[{ y: SB_HEIGHT + 5 }, { y: SCREEN_HEIGHT - 100 }, { y: SCREEN_HEIGHT }]}
          boundaries={{ top: -300 }}
          initialPosition={{ y: SCREEN_HEIGHT - 100 }}
          // animatedValueY={this._deltaY}
        >
          <SuperEllipseMask radius={{ topRight: 20, topLeft: 20 }}>
            <BlurView
              blurType={"xlight"}
              blurAmount={15}
              style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            >
              <View style={styles.actionButtonContainer}>
                <TouchableScale onPress={() => console.log("hello!")}>
                  <View style={[styles.button, { backgroundColor: Colors.activeBackground1 }]}>
                    <View style={{ flexDirection: "row" }}>
                      <AwesomeIcon name={"bolt"} size={24} color={"white"} />
                      <FeatherIcon name={"plus"} size={14} color={"white"} />
                    </View>
                  </View>
                </TouchableScale>
                <TouchableScale onPress={() => console.log("hello!")}>
                  <AwesomeIcon name={"bolt"} size={24} />
                </TouchableScale>
                <TouchableScale onPress={() => console.log("hello!")}>
                  <View style={[styles.button, { backgroundColor: Colors.laterBackground1 }]}>
                    <View style={{ flexDirection: "row" }}>
                      <AwesomeIcon name={"clock-o"} size={24} color={"white"} />
                      <FeatherIcon name={"plus"} size={14} color={"white"} />
                    </View>
                  </View>
                </TouchableScale>
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
  actionButtonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    width: SCREEN_WIDTH,
    height: 100,
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    // backgroundColor: Colors.activeBackground1,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  panel: {
    flex: 1
  }
});

export default Drawer;
