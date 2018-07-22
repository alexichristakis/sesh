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

import { TransparentModalTo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";
import { BORDER_RADIUS } from "../../lib/constants";

const ICON_SIZE = 110;

const ActiveMove = props => {
  const { photo, group, name, description, time } = props.move;

  formatDistanceAway = () => {
    const miles = geolib.getDistance(props.move.location, props.coords) * 0.000621;
    const suffix = "mi";
    if (miles > 1) return Math.round(miles) + suffix;
    else return Math.round(100 * miles) / 100 + suffix;
  };

  const handleGroupOnPress = () => {
    // ReactNativeHapticFeedback.trigger("impactLight");
    // props.onPressPresentOverlayTo("sesh.Focus", {
    //   groups: true,
    //   data: { name: group, size: 12 }
    // });
    TransparentModalTo("sesh.Focus", {
      groups: true,
      data: { name: group, size: 12 }
    });
  };

  return (
    <SuperEllipseMask style={styles.container} radius={BORDER_RADIUS}>
      <Image style={styles.image} source={{ uri: photo, cache: "force-cache" }} />
      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", paddingBottom: 5 }}
            onPress={handleGroupOnPress}
          >
            <Text allowFontScaling={false} style={styles.group}>
              {name}
            </Text>
            {/* <Icon name={"corner-down-right"} size={20} color={Colors.later} /> */}
            <Icon style={{ paddingTop: 3 }} name={"chevron-right"} size={14} color={Colors.later} />
            {/* <IonIcon name={"ios-play"} size={18} color={Colors.later} /> */}
            <Text allowFontScaling={false} style={styles.group}>
              {group}
            </Text>
          </TouchableOpacity>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              style={{ paddingTop: 1, paddingRight: 2 }}
              name={"compass"}
              size={14}
              color={Colors.gray}
            />
            <Text style={styles.location}>{formatDistanceAway()}</Text>
          </View>
          <Text style={styles.time}>{moment(time).fromNow()}</Text>
        </View>
      </View>
    </SuperEllipseMask>
    // <SuperEllipseMask style={styles.container} radius={BORDER_RADIUS}>
    //   <View style={styles.top}>
    //     <Image
    //       style={styles.image}
    //       resizeMode="cover"
    //       source={{ uri: photo, cache: "force-cache" }}
    //     />
    //     <View style={styles.header}>
    //       <TouchableOpacity onPress={handleGroupOnPress}>
    //         <Text style={styles.group}>{group}</Text>
    //       </TouchableOpacity>
    //       <View style={{ flexDirection: "row" }}>
    //         <Icon name={"corner-left-up"} size={14} color={Colors.later} />
    //         <Text style={styles.name}>{name}</Text>
    //       </View>
    //     </View>
    //   </View>
    //   <Text style={styles.description}>{description}</Text>
    //   <View style={styles.bottom}>
    //     <Text style={styles.time}>{moment(time).fromNow()}</Text>
    //     <View style={{ flexDirection: "row", alignItems: "center" }}>
    //       <Icon name={"compass"} size={14} color={Colors.gray} />
    //       <Text style={styles.location}>{formatDistanceAway()}</Text>
    //     </View>
    //   </View>
    // </SuperEllipseMask>
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
    flex: 1,
    alignSelf: "center",
    backgroundColor: Colors.gray,
    // borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE
    // width: ICON_SIZE
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

export default ActiveMove;
