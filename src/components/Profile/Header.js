import React from "react";
import { StyleSheet, Animated, StatusBar, View, TouchableOpacity, Image, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, IS_X, REFRESH_OFFSET } from "../../lib/constants";
import { Colors, FillAbsolute } from "../../lib/styles";

const PHOTO_SIZE = 100;

const Header = ({ user, offset, showProfileSettings }) => {
  const { displayName, photo } = user;
  const inputRange = [-SB_HEIGHT - 50, -SB_HEIGHT, 0, 150];

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
    // transform: [
    //   {
    //     translateY: offset.interpolate({
    //       inputRange,
    //       outputRange: [10, 0, -20, -40],
    //       extrapolateRight: "clamp"
    //     })
    //   }
    // ]
  };

  const textAnimatedStyle = {
    opacity: offset.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
      // extrapolate: "clamp"
    })
  };

  const barOpacity = {
    opacity: offset.interpolate({
      inputRange,
      outputRange: [0, 0, 0, 1],
      extrapolate: "clamp"
    })
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, barOpacity]}>
        <Text style={styles.title}>My Groups:</Text>
      </Animated.View>
      <Animated.View style={[styles.actionButtonContainer, animatedActionButtons]}>
        <TouchableOpacity style={styles.actionButton} onPress={showProfileSettings}>
          <IonIcon
            style={{ marginTop: 3 }}
            name={"ios-settings"}
            size={30}
            color={Colors.groupsHeader1}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => console.log("add friend")}>
          <MaterialIcon name={"person-add"} size={30} color={Colors.groupsHeader1} />
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
  bar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: SB_HEIGHT,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderColor: Colors.mediumGray
  },
  title: {
    fontSize: 20,
    color: Colors.groupsHeader1,
    fontWeight: "bold"
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
    top: SB_HEIGHT + 5,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionButton: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 22.5
  }
});

export default Header;
