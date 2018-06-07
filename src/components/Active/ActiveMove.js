import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "react-native-blur";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

const ICON_SIZE = 50;

class ActiveMove extends Component {
  render() {
    const move = this.props.move;

    const group = {
      id: "1",
      name: move.group,
      size: 9,
      time: 1526598742850,
      photo: "https://graph.facebook.com/1825693684117541/picture"
    };

    let groupName = <Text style={styles.group}>{move.group}</Text>;

    return (
      <SuperEllipseMask radius={20}>
        <View style={styles.container}>
          {!this.props.blur && <View style={styles.background} />}
          {this.props.blur && <BlurView blurType={"light"} style={styles.blur} />}
          <View style={styles.top}>
            <Image style={styles.image} resizeMode="cover" source={{ uri: move.photo }} />
            <View style={styles.header}>
              <View style={{ flex: 2 }}>
                {this.props.focused && (
                  <TouchableOpacity
                    onPress={() => {
                      ReactNativeHapticFeedback.trigger("impactLight");
                      this.props.onPressPresentOverlayTo("sesh.GroupFocus", {
                        data: group
                      });
                    }}
                  >
                    {groupName}
                  </TouchableOpacity>
                )}
                {!this.props.focused && groupName}
                <View style={{ flexDirection: "row" }}>
                  <Icon name={"corner-down-right"} size={14} color={Colors.primary} />
                  <Text style={styles.from}>from </Text>
                  <Text style={styles.name}>{move.name}</Text>
                </View>
              </View>
              {/* <Text style={styles.time}>{TimeAgo(move.time)}</Text> */}
            </View>
          </View>
          <View style={styles.mid}>
            <Text style={styles.description}>{move.description}</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.time}>{TimeAgo(move.time)}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name={"compass"} size={14} color={Colors.active} />
              <Text style={styles.location}>{move.location}</Text>
            </View>
          </View>
        </View>
      </SuperEllipseMask>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 15,
    // paddingTop: 10,
    // paddingRight: 12,
    overflow: "hidden",
    // backgroundColor: "white",
    backgroundColor: "rgba(255,255,255,0.5)"
    // ...shadow,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white"
    // opacity: 0.2
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  top: {
    padding: 10,
    flex: 2,
    flexDirection: "row"
  },
  image: {
    alignSelf: "center",
    backgroundColor: Colors.gray,
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    width: ICON_SIZE
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 10,
    marginBottom: 3
  },
  from: {
    fontSize: 14,
    marginLeft: 3,
    color: Colors.gray
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.gray
  },
  group: {
    fontSize: 24,
    // fontWeight: "800"
    fontWeight: "300"
    // color: Colors.active,
  },
  time: {
    // flex: 1,
    textAlign: "right",
    // paddingTop: 4,
    fontSize: 14,
    // alignSelf: "center",
    // color: Colors.active,
    color: Colors.active,
    fontWeight: "800"
    // fontWeight: "300",
  },
  mid: {
    flex: 2,
    // marginVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    fontWeight: "300"
  },
  bottom: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
    // backgroundColor: Colors.active
    // bacl
    // alignSelf: "flex-end"
  },
  location: {
    marginLeft: 2,
    fontSize: 14,
    // fontWeight: "200",
    fontWeight: "800",
    color: Colors.active
  }
});

export default ActiveMove;
