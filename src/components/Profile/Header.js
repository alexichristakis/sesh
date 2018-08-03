import React from "react";
import { StyleSheet, Animated, View, TouchableOpacity, Image, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, IS_X, REFRESH_OFFSET } from "../../lib/constants";
import { Colors, FillAbsolute } from "../../lib/styles";

const PHOTO_SIZE = 100;

const Header = ({ user, offset }) => {
  const { displayName, photo } = user;
  const inputRange = [-SB_HEIGHT - 50, -SB_HEIGHT, 0, 50];

  const animatedUserInfo = {
    top: SB_HEIGHT + 10,
    alignItems: "center",
    transform: [
      {
        scale: offset.interpolate({
          inputRange,
          outputRange: [1.1, 1, 0.7, 0.5],
          extrapolate: "clamp"
        })
      },
      {
        translateY: offset.interpolate({
          inputRange,
          outputRange: [50, 0, -45, -90],
          extrapolate: "clamp"
        })
      }
    ]
  };

  const animatedActionButtons = {
    transform: [
      {
        translateY: offset.interpolate({
          inputRange,
          outputRange: [50, 0, -20, -40],
          extrapolate: "clamp"
        })
      }
    ]
  };

  const textAnimatedStyle = {
    opacity: offset.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
      // extrapolate: "clamp"
    })
  };

  const shadowOpacity = {
    opacity: offset.interpolate({
      inputRange,
      outputRange: [0, 0, 0.5, 1],
      extrapolate: "clamp"
    })
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.shadowContainer, shadowOpacity]}>
        <LinearGradient
          style={styles.flex}
          locations={[0.25, 1]}
          colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0)"]}
        />
      </Animated.View>
      <Animated.View style={animatedUserInfo}>
        <SuperEllipseMask radius={PHOTO_SIZE / 4}>
          <Image source={{ uri: photo }} style={styles.photo} />
        </SuperEllipseMask>
        <Animated.Text style={[styles.name, textAnimatedStyle]}>{displayName}</Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.actionButtonContainer, animatedActionButtons]}>
        {/* <FeatherIcon name={"settings"} size={25} color={"white"} /> */}
        <TouchableOpacity onPress={() => console.log("settings")}>
          <IonIcon name={"ios-settings"} size={30} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("add friend")}>
          <MaterialIcon name={"person-add"} size={30} color={"white"} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center"
    // height:
  },
  shadowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100
  },
  flex: {
    flex: 1
  },
  photo: {
    height: PHOTO_SIZE,
    width: PHOTO_SIZE
    // margin: 5
  },
  name: {
    marginVertical: 5,
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  actionButtonContainer: {
    position: "absolute",
    top: SB_HEIGHT + 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Header;
