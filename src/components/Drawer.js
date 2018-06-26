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
const ICON_SIZE = 50;
const DRAWER_HEIGHT = 80;

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.animated = new Animated.Value(0);
    this.deltaY = new Animated.Value(SCREEN_HEIGHT);
    this.state = {
      hidden: false,
      open: false
      // dragging: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("next props: ", nextProps.hidden);
    if (nextProps.hidden) this.setState({ hidden: true }, this.handleHideDrawer());
    else if (!nextProps.hidden) this.setState({ hidden: false }, this.handleShowDrawer());
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.hidden === nextState.hidden) return false;
  //   else return true;
  // }

  handleHideDrawer = () => {
    Animated.timing(this.animated, {
      toValue: 1,
      delay: 50,
      duration: 100,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true
    }).start();
  };

  handleShowDrawer = () => {
    Animated.timing(this.animated, {
      toValue: 0,
      delay: 50,
      duration: 100,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true
    }).start();
  };

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 1) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  presentGroupsModal = () => {
    Navigation.showModal({
      component: {
        name: "sesh.Groups"
      }
    });
  };

  toggleDrawer = () => {
    let newIndex = this.state.open ? 0 : 1;
    this.interactable.snapTo({ index: newIndex });
  };

  render() {
    const { onPressPresentModalTo } = this.props;

    let animatedTranslate = {
      transform: [
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, DRAWER_HEIGHT]
          })
        }
      ]
    };

    let OpenContent = (
      <View style={{ paddingHorizontal: CARD_GUTTER }}>
        <MapCard loading={!this.state.open} large />
        <ColorButton title={"My Groups"} color={Colors.groups} onPress={this.presentGroupsModal} />
        <ColorButton
          title={"My Friends"}
          color={Colors.primary}
          onPress={() => console.log("hello")}
        />
      </View>
    );

    const closed = { y: SCREEN_HEIGHT - DRAWER_HEIGHT };
    const open = { y: SB_HEIGHT + 2 };

    return (
      <Animated.View style={[FillAbsolute, animatedTranslate]} pointerEvents={"box-none"}>
        <Interactable.View
          animatedNativeDriver
          ref={view => (this.interactable = view)}
          verticalOnly={true}
          snapPoints={[closed, open]}
          onSnap={this.handleOnSnap}
          boundaries={{
            top: SB_HEIGHT - 5,
            bottom: SCREEN_HEIGHT - DRAWER_HEIGHT + 5,
            haptics: true
          }}
          initialPosition={closed}
          animatedValueY={this.deltaY}
        >
          {/* <View style={styles.curveContainer}> */}
          {/* <SuperEllipseMask style={styles.rotate} radius={SCREEN_WIDTH * 8}>
            <BlurView blurType={"xlight"} blurAmount={15} style={styles.blur} />
          </SuperEllipseMask> */}
          {/* </View> */}
          {/* <LinearGradient
            style={{
              position: "absolute",
              bottom: DRAWER_HEIGHT / 2,
              height: DRAWER_HEIGHT,
              left: 0,
              right: 0
            }}
            locations={[0.5, 1]}
            colors={["rgba(0,0,0,1)", "rgba(0,0,0,1)"]}
          /> */}
          <SuperEllipseMask style={styles.blurContainer} radius={{ topRight: 20, topLeft: 20 }}>
            <BlurView blurType={"xlight"} blurAmount={15} style={styles.blur} />
            {/* <View style={[styles.blur, { backgroundColor: "white" }]} /> */}
          </SuperEllipseMask>
          <View style={styles.background} />
          <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
            <View style={styles.indicator} />
            {/* <FeatherIcon
              style={{ position: "absolute", alignSelf: "center", top: -15, bottom: 0 }}
              name={"minus"}
              size={50}
              color={Colors.gray}
            /> */}
            <View style={styles.actionButtonContainer}>
              <TouchableScale onPress={() => console.log("hello!")}>
                <View style={styles.button}>
                  <View style={{ flexDirection: "row" }}>
                    <AwesomeIcon name={"bolt"} size={30} color={Colors.activeBackground1} />
                    <FeatherIcon name={"plus"} size={14} color={Colors.activeBackground1} />
                  </View>
                </View>
              </TouchableScale>
              <TouchableScale onPress={this.toggleDrawer}>
                {/* <Image source={{ uri: this.props.photo }} style={styles.photo} /> */}
                <IonIcon name={"ios-navigate"} size={48} color={Colors.primary} />
              </TouchableScale>
              <TouchableScale onPress={() => console.log("hello!")}>
                <View style={styles.button}>
                  <View style={{ flexDirection: "row" }}>
                    {/* <AwesomeIcon name={"clock-o"} size={30} color={Colors.laterBackground1} /> */}
                    <IonIcon name={"ios-time"} size={30} color={Colors.laterBackground1} />
                    <FeatherIcon name={"plus"} size={14} color={Colors.laterBackground1} />
                  </View>
                </View>
              </TouchableScale>
            </View>
            {OpenContent}
          </View>
        </Interactable.View>
      </Animated.View>
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
    // position: "absolute",
    top: 7,
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.gray
  },
  blur: {
    height: DRAWER_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.mediumGray
    // height: SCREEN_WIDTH * 16,
    // width: SCREEN_WIDTH * 16
  },
  blurContainer: {
    position: "absolute",
    ...heavyShadow
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
    overflow: "hidden",
    ...heavyShadow
  },
  background: {
    position: "absolute",
    top: DRAWER_HEIGHT,
    height: SCREEN_HEIGHT - DRAWER_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.lightGray
  },
  actionButtonContainer: {
    flexDirection: "row",
    // paddingHorizontal: 80,
    width: SCREEN_WIDTH,
    height: DRAWER_HEIGHT,
    alignItems: "center",
    justifyContent: "space-evenly",
    // paddingVertical: 10
    paddingBottom: SB_HEIGHT === 40 ? 10 : 0
  },
  button: {
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: Colors.gray
  },
  panel: {
    flex: 1
  }
});

export default Drawer;
