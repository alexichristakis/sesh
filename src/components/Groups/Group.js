import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import SuperEllipseMask from "react-native-super-ellipse-mask";
// import RNFS from "react-native-fs";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";

import TouchableScale from "../global/TouchableScale";

import { TransparentModalTo } from "../../lib/functions";
import { Colors, shadow, cardShadow } from "../../lib/styles";
import { BORDER_RADIUS } from "../../lib/constants";

const ICON_SIZE1 = 35;
const ICON_SIZE2 = 30;

const Group = props => {
  presentOptionsOverlay = item => () => {
    // console.log("transition!");
    // Navigation.showOverlay({
    //   component: {
    //     name: "sesh.Settings",
    //     passProps: { name: item.name, data: item }
    //   }
    // });
    TransparentModalTo("sesh.Settings", { name: item.name, data: item });
  };

  const group = props.data;

  return (
    <SuperEllipseMask style={styles.container} radius={props.card ? BORDER_RADIUS : 0}>
      <View style={styles.mid}>
        <Text allowFontScaling={props.card ? false : true} style={styles.name}>
          {group.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.size}>{group.size}</Text>
          <FeatherIcon
            style={{ paddingLeft: 5, paddingBottom: 1 }}
            name={"users"}
            size={14}
            color={Colors.groups}
          />
          {/* <EntypoIcon style={{ paddingTop: 2 }} name={"dot-single"} size={14} color={Colors.gray} /> */}
        </View>
      </View>
      {!props.selectable && (
        <TouchableOpacity onPress={presentOptionsOverlay(group)}>
          <FeatherIcon
            style={{ paddingRight: 5, paddingBottom: 1 }}
            name={"settings"}
            size={20}
            color={Colors.gray}
          />
        </TouchableOpacity>
      )}
      {props.selectable && (
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 5,
            backgroundColor: props.selected ? Colors.groups : "white",
            borderColor: props.selected ? Colors.groups : Colors.gray,
            borderWidth: 0.5
          }}
        />
      )}
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "transparent",
    // backgroundColor: "white",
    // marginHorizontal: 10,
    // borderWidth: 20,
    // borderColor: Colors.primary,
    overflow: "hidden",
    padding: 10,
    paddingRight: 20
    // ...shadow
  },
  pictures: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12
  },
  mid: {
    flex: 5,
    marginLeft: 10
  },
  name: {
    fontSize: 24,
    fontWeight: "300"
    // color: "white"
  },
  size: {
    fontSize: 14,
    fontWeight: "300",
    color: Colors.gray
  },
  time: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.gray
  }
});

export default Group;
