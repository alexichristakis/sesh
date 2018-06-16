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
      <SuperEllipseMask radius={10}>
        <View
          style={[
            styles.container,
            { backgroundColor: this.props.blur ? "rgba(255,255,255,0.5)" : "white" }
          ]}
        >
          {this.props.blur && <BlurView blurType={"light"} style={styles.blur} />}
          <View style={styles.top}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: move.photo, cache: "force-cache" }}
              // source={{
              //   uri: 'https://farm5.staticflickr.com/4374/36390435575_7e51b26c00_z.jpg',
              //   cache: 'force-cache'
              // }}
            />
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
                  <Icon name={"corner-left-up"} size={14} color={Colors.active} />
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
              <Icon name={"compass"} size={14} color={Colors.gray} />
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
    overflow: "hidden"
    // backgroundColor: "white",
    // backgroundColor: "rgba(255,255,255,0.5)"
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
    paddingTop: 2,
    paddingLeft: 3,
    fontSize: 14,
    // fontWeight: "bold",
    color: Colors.gray
  },
  group: {
    fontSize: 24
    // fontWeight: "800"
    // fontWeight: "300"
    // color: Colors.active,
  },
  time: {
    // flex: 1,
    textAlign: "right",
    // paddingTop: 4,
    fontSize: 14,
    // alignSelf: "center",
    // color: Colors.active,
    color: Colors.gray
    // fontWeight: "800"
    // fontWeight: "300",
  },
  mid: {
    flex: 2,
    // marginVertical: 10,
    paddingHorizontal: 10
    // marginBottom: 5
  },
  description: {
    fontSize: 14
    // fontWeight: "200"
    // fontWeight: "800"
  },
  bottom: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
    // backgroundColor: Colors.gray
    // bacl
    // alignSelf: "flex-end"
  },
  location: {
    paddingTop: 1,
    marginLeft: 2,
    fontSize: 14,
    // fontWeight: "200",
    // fontWeight: "800",
    color: Colors.gray
  }
});

export default ActiveMove;
