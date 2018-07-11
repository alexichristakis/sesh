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

import TouchableScale from "../global/TouchableScale";
import MapCard from "../global/MapCard";
import ColorButton from "../global/ColorButton";

import { TransparentModalTo } from "~/lib/functions";
import { Colors, FillAbsolute, heavyShadow } from "~/lib/styles";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  ANIMATION_DURATION,
  CARD_GUTTER
} from "~/lib/constants";

const BUTTON_SIZE = 40;
const ICON_SIZE = 60;
const DRAWER_HEIGHT = 100;

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
    const currentTime = new Date().getTime();

    let markers = [];
    moves.forEach(move => {
      const { time, location, id, group, description } = move;
      const active = time - currentTime < 0;
      markers.push({
        coords: location,
        key: id,
        active: active,
        group: group,
        description: description
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
    // ReactNativeHapticFeedback.trigger("impactLight");
    TransparentModalTo("sesh.CreateMove", {
      active: true,
      groups: this.props.data.groups
    });
    // Navigation.showOverlay({
    //   component: {
    //     name: "sesh.CreateMove",
    //     passProps: {
    //       active: true,
    //       groups: this.props.data.groups
    //     }
    //   }
    // });
    // Navigation.showModal({
    //   component: {
    //     name: "sesh.CreateMove",
    //     passProps: {
    //       active: true,
    //       groups: this.props.data.groups
    //     }
    //   }
    // });

    // Navigation.showOverlay({
    //   component: {
    //     name: "sesh.CreateMove",
    //     passProps: {
    //       active: true,
    //       groups: this.props.data.groups
    //     }
    //   }
    // });
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
    TransparentModalTo("sesh.CreateMove", {
      active: false,
      groups: this.props.data.groups
    });
    // Navigation.showModal({
    //   component: {
    //     name: "sesh.CreateMove",
    //     passProps: {
    //       active: false,
    //       groups: this.props.data.groups
    //     }
    //   }
    // })
    // ReactNativeHapticFeedback.trigger("impactLight");
    // Navigation.showOverlay({
    //   component: {
    //     name: "sesh.CreateMove",
    //     passProps: {
    //       active: false,
    //       groups: this.props.data.groups
    //     }
    //   }
    // });
  };

  toggleDrawer = () => {
    this.setState({ transitioning: true }, () => {
      let newIndex = this.state.open ? 0 : 1;
      ReactNativeHapticFeedback.trigger("impactLight");
      this.interactable.snapTo({ index: newIndex });
    });
  };

  render() {
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

          {/* <SuperEllipseMask style={styles.blurContainer} radius={{ topRight: 20, topLeft: 20 }}>
            <BlurView blurType={"light"} blurAmount={30} style={styles.blur} />
          </SuperEllipseMask> */}
          {/* <View
            style={[
              styles.blurContainer,
              {
                backgroundColor: Colors.lightGray,
                borderColor: "#414141",
                borderTopWidth: 0.25
              }
            ]}
          /> */}
          {/* <LinearGradient
            style={styles.blurContainer}
            locations={[0.25, 0.5, 0.75, 1]}
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.7)"]}
          /> */}
          <View style={styles.background} />

          <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
            <View style={styles.actionButtonContainer}>
              <TouchableScale
                style={{ marginLeft: 50 }}
                disabled={this.state.open}
                onPress={this.presentNewActiveMove}
              >
                <Animated.View
                  style={[
                    animatedScale,
                    styles.button,
                    { backgroundColor: Colors.activeBackground1 }
                  ]}
                >
                  <AwesomeIcon name={"bolt"} size={30} color={Colors.lightGray} />
                  <FeatherIcon name={"plus"} size={14} color={Colors.lightGray} />
                </Animated.View>
              </TouchableScale>
              <TouchableScale onPress={this.toggleDrawer}>
                <IonIcon name={"ios-navigate"} size={48} color={Colors.lightGray} />
              </TouchableScale>
              <TouchableScale
                style={{ marginRight: 50 }}
                disabled={this.state.open}
                onPress={this.presentNewLaterMove}
              >
                <Animated.View
                  style={[
                    animatedScale,
                    styles.button,
                    { backgroundColor: Colors.activeBackground1 }
                  ]}
                >
                  <IonIcon name={"ios-time"} size={30} color={Colors.lightGray} />
                  <FeatherIcon name={"plus"} size={14} color={Colors.lightGray} />
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
    backgroundColor: "rgba(230,230,230,0.9)"
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
    flexDirection: "row",
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    // backgroundColor: Colors.activeBackground1,
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
