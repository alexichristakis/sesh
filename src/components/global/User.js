import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import Checkmark from "./Checkmark";
import ColorButton from "./ColorButton";

import { Colors, TextStyles } from "../../lib/styles";
import { BORDER_RADIUS } from "../../lib/constants";

const ICON_SIZE = 35;

const User = ({
  selectable,
  request,
  onPressAccept,
  onPressDelete,
  user,
  selected,
  onPress
}) => {
  handleOnPress = () => {
    onPress(user);
  };

  let content = (
    <>
      <Image style={styles.image} source={{ uri: user.photo }} />
      <Text style={styles.name}>{user.name}</Text>
      {selectable &&
        (selected ? (
          <Checkmark style={{ marginRight: 5 }} size={25} />
        ) : (
          <Icon name={"plus"} size={20} color={Colors.primary} />
        ))}
      {request && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <ColorButton
            title="Confirm"
            textStyle={TextStyles.bold}
            style={styles.button}
            borderRadius={5}
            onPress={() => onPressAccept(user.uid)}
            color={Colors.green}
          />
          <ColorButton
            title="Delete"
            textStyle={TextStyles.bold}
            style={styles.button}
            borderRadius={5}
            onPress={() => onPressDelete(user.uid)}
            color={Colors.red}
          />
        </View>
      )}
    </>
  );

  if (selectable)
    return (
      <TouchableOpacity style={styles.container} onPress={handleOnPress}>
        {content}
      </TouchableOpacity>
    );
  else return <View style={styles.container}>{content}</View>;

  // return (
  //   <TouchableOpacity style={styles.container} onPress={handleOnPress}>
  //     <Image style={styles.image} source={{ uri: user.photo }} />
  //     <Text style={styles.name}>{user.name}</Text>
  //     {selectable &&
  //       (selected ? (
  //         <Checkmark style={{ marginRight: 5 }} size={25} />
  //       ) : (
  //         <Icon name={"plus"} size={20} color={Colors.primary} />
  //       ))}
  //     {request && (
  //       <View
  //         style={{
  //           flex: 1,
  //           flexDirection: "row",
  //           justifyContent: "space-between"
  //         }}
  //       >
  //         <ColorButton
  //           title="Confirm"
  //           textStyle={TextStyles.bold}
  //           style={styles.button}
  //           borderRadius={5}
  //           onPress={() => onPressAccept(user.uid)}
  //           color={Colors.green}
  //         />
  //         <ColorButton
  //           title="Delete"
  //           textStyle={TextStyles.bold}
  //           style={styles.button}
  //           borderRadius={5}
  //           onPress={() => onPressDelete(user.uid)}
  //           color={Colors.red}
  //         />
  //       </View>
  //     )}
  //   </TouchableOpacity>
  // );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 7
  },
  image: {
    // position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.gray,
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    width: ICON_SIZE
  },
  row: { flexDirection: "row" },
  name: {
    ...TextStyles.body,
    flex: 1,
    marginLeft: 10,
    alignSelf: "center"
  },
  time: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "300",
    color: Colors.gray
  },
  button: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderWidth: 1
    // marginHorizontal: 2.5
  }
});

export default User;
