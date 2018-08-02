import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import { VibrancyView, BlurView } from "react-native-blur";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Icon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import geolib from "geolib";
import moment from "moment";

import ProgressiveImage from "../global/ProgressiveImage";

import { TransparentModalTo, GetPhotoURL, GetThumbnailURL } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";
import { SCREEN_WIDTH, CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";

// const ICON_SIZE = 110;
const ICON_SIZE = Math.round((SCREEN_WIDTH - 2 * CARD_GUTTER) / 3);
// const ICON_SIZE = 122;

const LaterMove = ({ coords, move }) => {
  const { photo, group, name, description, location, time, user_fb_id } = move;

  formatDistanceAway = () => {
    const miles = geolib.getDistance(location, coords) * 0.000621;
    const suffix = "mi";
    if (miles > 1) return Math.round(miles) + suffix;
    else return Math.round(100 * miles) / 100 + suffix;
  };

  const handleGroupOnPress = () => {
    TransparentModalTo("sesh.Focus", {
      groups: true,
      data: { name: group, size: 12 }
    });
  };

  return (
    <SuperEllipseMask style={styles.container} radius={BORDER_RADIUS}>
      <ProgressiveImage
        style={styles.image}
        source={GetPhotoURL(user_fb_id, ICON_SIZE, ICON_SIZE)}
        thumbnail={GetThumbnailURL(user_fb_id)}
      />
      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", paddingBottom: 5 }}
            onPress={handleGroupOnPress}
          >
            <Text allowFontScaling={false} style={styles.group}>
              {name}
            </Text>
            {/* <Icon name={"corner-down-right"} size={20} color={Colors.active} /> */}
            <Icon style={{ paddingTop: 3 }} name={"chevron-right"} size={14} color={Colors.later} />
            {/* <IonIcon name={"ios-play"} size={} color={Colors.active} /> */}
            <Text allowFontScaling={false} style={styles.group}>
              {group}
            </Text>
          </TouchableOpacity>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={{ flexDirection: "row" }}>
            <Icon style={{ paddingRight: 2 }} name={"compass"} size={14} color={Colors.gray} />
            <Text style={styles.location}>{formatDistanceAway()}</Text>
          </View>
          <Text style={styles.time}>{moment(time).fromNow()}</Text>
        </View>
      </View>
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white"
  },
  top: {
    flex: 2,
    flexDirection: "row"
  },
  image: {
    // flex: 1,
    alignSelf: "center",
    backgroundColor: Colors.gray,
    // borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    width: ICON_SIZE
    // margin: 10
  },
  contentContainer: {
    flex: 2,
    padding: 10
  },
  header: {
    flex: 2,
    alignSelf: "center"
  },
  vibrancy: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
    borderRadius: 12.5
  },
  name: {
    fontSize: 14,
    color: Colors.gray
  },
  group: {
    fontSize: 16,
    fontWeight: "500"
  },
  time: {
    textAlign: "right",
    fontSize: 14,
    color: Colors.gray
    // color: Colors.gray
  },
  description: {
    flex: 1,
    fontSize: 14
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  location: {
    fontSize: 14,
    color: Colors.gray
  }
});

export default LaterMove;
