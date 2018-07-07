import React, { Component } from "react";
import { StyleSheet, Easing, Animated, View, Text, Image } from "react-native";

import Interactable from "react-native-interactable";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";
import LinearGradient from "react-native-linear-gradient";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import FeatherIcon from "react-native-vector-icons/Feather";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";

import TouchableScale from "./global/TouchableScale";
import MapCard from "./global/MapCard";
import ColorButton from "./global/ColorButton";

import { Colors, FillAbsolute, heavyShadow } from "../lib/styles";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  ANIMATION_DURATION,
  CARD_GUTTER
} from "../lib/constants";

const BUTTON_SIZE = 40;
const ICON_SIZE = 60;
const DRAWER_HEIGHT = 90;

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);
    this.state = {
      open: false,
      transitioning: false
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.transitioning !== nextState.transitioning) return false;
  //   else if (this.state.hidden === nextState.hidden) return false;
  //   else return true;
  // }

  generateMarkers = () => {
    const { moves } = this.props.data;
    const time = new Date().getTime();

    let markers = [];
    moves.forEach(move => {
      const active = move.time - time < 0;
      markers.push({
        coords: move.location,
        key: move.id,
        active: active,
        group: move.group,
        description: move.description
      });
    });

    return markers;
  };

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

  presentGroupsModal = () => {
    Navigation.showModal({
      component: {
        name: "sesh.Groups"
      }
    });
  };

  presentNewActiveMove = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    Navigation.showOverlay({
      component: {
        name: "sesh.CreateMove",
        passProps: {
          active: true,
          groups: this.props.data.groups
        }
      }
    });
    // Navigation.showModal({
    //   component: {
    //     name: "sesh.CreateMove",
    //     passProps: {
    //       active: true,
    //       groups: this.props.data.groups
    //     },
    //     options: {
    //       modalPresentationStyle: "overCurrentContext",
    //       animations: {
    //         showModal: {
    //           enable: false
    //         },
    //         dismissModal: {
    //           enable: false
    //         }
    //       }
    //     }
    //   }
    // });
  };

  presentNewLaterMove = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    Navigation.showOverlay({
      component: {
        name: "sesh.CreateMove",
        passProps: {
          active: false,
          groups: this.props.data.groups
        }
      }
    });
  };

  toggleDrawer = () => {
    this.setState({ transitioning: true }, () => {
      let newIndex = this.state.open ? 0 : 1;
      ReactNativeHapticFeedback.trigger("impactLight");
      this.interactable.snapTo({ index: newIndex });
    });
  };

  render() {
    const { onPressPresentModalTo } = this.props;

    let animatedScale = {
      transform: [
        {
          scale: this.deltaY.interpolate({
            inputRange: [SB_HEIGHT, SCREEN_HEIGHT / 2, (3 * SCREEN_HEIGHT) / 4, SCREEN_HEIGHT],
            outputRange: [0, 0.8, 1, 1]
          })
        }
      ]
    };

    let animatedOpacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT, SCREEN_HEIGHT],
        outputRange: [0, 1]
      })
    };

    let blurOpacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT, SCREEN_HEIGHT / 2, (3 * SCREEN_HEIGHT) / 4, SCREEN_HEIGHT],
        outputRange: [1, 0.2, 0, 0]
      })
    };

    let OpenContent = (
      <View>
        {/* <View style={{ backgroundColor: "blue", width: SCREEN_WIDTH, height: 300 }} /> */}
        <MapCard
          fullBleed
          height={SCREEN_HEIGHT - SB_HEIGHT - 75}
          markers={this.generateMarkers()}
          loading={!this.state.open}
          userLocation={this.props.data.userLocation}
        />
        <Image source={{ uri: this.props.photo }} style={styles.photo} />
        {/* <View
          style={{
            position: "absolute",
            right: 2 * CARD_GUTTER,
            bottom: 100,
            height: ICON_SIZE,
            width: ICON_SIZE,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: ICON_SIZE / 2,
            backgroundColor: Colors.groups,
            borderWidth: 5,
            borderColor: "white"
          }}
        >
          <FeatherIcon name={"users"} size={24} color={"white"} />
        </View> */}
        {/* <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
          //  <ColorButton
          //   style={styles.colorButton}
          //   title={"My Groups"}
          //   color={Colors.groups}
          //   onPress={this.presentGroupsModal}
          // />
          // <ColorButton
          //   style={styles.colorButton}
          //   title={"My Friends"}
          //   color={Colors.primary}
          //   onPress={() => console.log("hello")}
          // />
        </View> */}
      </View>
    );

    const closed = { y: SCREEN_HEIGHT - DRAWER_HEIGHT + 10 };
    const open = { y: SB_HEIGHT - 5 };

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
            top: SB_HEIGHT - 10,
            bottom: SCREEN_HEIGHT - DRAWER_HEIGHT + 20,
            haptics: true
          }}
          initialPosition={closed}
          animatedValueY={this.deltaY}
        >
          <Animated.View style={[styles.indicator, animatedOpacity]} />

          <SuperEllipseMask style={styles.blurContainer} radius={{ topRight: 20, topLeft: 20 }}>
            <BlurView blurType={"xlight"} blurAmount={15} style={styles.blur} />
          </SuperEllipseMask>

          <View style={styles.background} />

          <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
            <View style={styles.actionButtonContainer}>
              <TouchableScale disabled={this.state.open} onPress={this.presentNewActiveMove}>
                <Animated.View style={[animatedScale, styles.button]}>
                  <View style={{ flexDirection: "row" }}>
                    <AwesomeIcon name={"bolt"} size={30} color={Colors.activeBackground1} />
                    <FeatherIcon name={"plus"} size={14} color={Colors.activeBackground1} />
                  </View>
                </Animated.View>
              </TouchableScale>
              <TouchableScale onPress={this.toggleDrawer}>
                <IonIcon name={"ios-navigate"} size={48} color={Colors.primary} />
              </TouchableScale>
              <TouchableScale disabled={this.state.open} onPress={this.presentNewLaterMove}>
                <Animated.View style={[animatedScale, styles.button]}>
                  <View style={{ flexDirection: "row" }}>
                    <IonIcon name={"ios-time"} size={30} color={Colors.laterBackground1} />
                    <FeatherIcon name={"plus"} size={14} color={Colors.laterBackground1} />
                  </View>
                </Animated.View>
              </TouchableScale>
            </View>
            {OpenContent}
          </View>
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
  indicator: {
    alignSelf: "center",
    // flex: 1,
    position: "absolute",
    top: 0,
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.gray
  },
  blur: {
    flex: 1,
    // top: 0,
    // height: DRAWER_HEIGHT - 10,
    // width: SCREEN_WIDTH,
    backgroundColor: "rgba(230,230,230,0.8)"
    // height: SCREEN_WIDTH * 16,
    // width: SCREEN_WIDTH * 16
  },
  blurContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: DRAWER_HEIGHT - 10,
    backgroundColor: "transparent"
    // backgroundColor: "red"
    // width: SCREEN_WIDTH,
    // ...heavyShadow
  },
  rotate: {
    position: "absolute",
    // marginTop: SCREEN_HEIGHT / 3 + 50,
    height: SCREEN_WIDTH * 16,
    width: SCREEN_WIDTH * 16,
    left: -SCREEN_WIDTH * 2.5,
    transform: [{ rotateZ: "45deg" }],
    backgroundColor: "transparent"
  },
  curveContainer: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: DRAWER_HEIGHT + 5,
    overflow: "hidden"
    // ...heavyShadow
  },
  background: {
    position: "absolute",
    top: DRAWER_HEIGHT,
    height: SCREEN_HEIGHT - DRAWER_HEIGHT - 10,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.lightGray
    // backgroundColor: "red"
  },
  buttonContainer: {
    // flexDirection: "row",
    // paddingHorizontal: 80,
    width: SCREEN_WIDTH,
    height: DRAWER_HEIGHT,
    alignItems: "stretch",
    // justifyContent: "space-between",
    // backgroundColor: "blue",
    // paddingVertical: 10
    paddingBottom: SB_HEIGHT === 40 ? 50 : 10
    // paddingBottom: 15
  },
  actionButtonContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: SCREEN_WIDTH,
    height: DRAWER_HEIGHT - 10,
    paddingTop: SB_HEIGHT === 20 ? 10 : 0
  },
  button: {
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  // colorButton: { marginHorizontal: 10 },
  photo: {
    position: "absolute",
    right: 2 * CARD_GUTTER,
    bottom: SB_HEIGHT === 40 ? 30 : 2 * CARD_GUTTER,
    height: ICON_SIZE,
    width: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: Colors.gray
  },
  panel: {
    flex: 1
  }
});

export default Drawer;
