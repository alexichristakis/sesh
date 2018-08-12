import React from "react";
import { StyleSheet, Animated, View, Image } from "react-native";

import ProgressiveImage from "../global/ProgressiveImage";

import { GetPhotoURL, GetThumbnailURL } from "../../lib/functions";
import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT, IS_X, REFRESH_OFFSET } from "../../lib/constants";
import { Colors, FillAbsolute } from "../../lib/styles";

const PHOTO_SIZE = 1.25 * SCREEN_WIDTH;

const Parallax = ({ user, offset, showProfileSettings }) => {
  const { displayName, photo, fb_id } = user;
  const inputRange = [-100, -50, 0, 50];

  const animatedImage = {
    top: -50,
    transform: [
      {
        scale: offset.interpolate({
          inputRange,
          outputRange: [1.3, 1.1, 1, 4 / 5],
          extrapolateRight: "clamp"
        })
      },
      {
        translateY: offset.interpolate({
          inputRange,
          outputRange: [50, 25, 0, -50]
          // extrapolateLeft: "clamp"
        })
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: GetPhotoURL(fb_id, PHOTO_SIZE / 4, PHOTO_SIZE / 4) }}
        style={{ position: "absolute", top: 0, width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
        blurRadius={20}
      />
      <Animated.View style={animatedImage}>
        <ProgressiveImage
          style={styles.photo}
          source={{ uri: GetPhotoURL(fb_id, PHOTO_SIZE, PHOTO_SIZE) }}
          thumbnail={{ uri: GetThumbnailURL(fb_id) }}
        />
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
    bottom: 0,
    alignItems: "center",
    overflow: "hidden"
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
    backgroundColor: Colors.mediumGray,
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

export default Parallax;
