import React from "react";
import { Animated, StyleSheet, KeyboardAvoidingView } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import TouchableScale from "../global/TouchableScale";

import { Colors } from "../../lib/styles";

const buttonScale = new Animated.Value(0);

const SendButton = props => {
  if (props.visible) {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start();
  } else {
    Animated.timing(buttonScale, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start();
  }

  let buttonAnimatedStyle = {
    transform: [
      {
        scale: buttonScale
      }
    ]
  };

  return (
    <KeyboardAvoidingView
      enabled
      pointerEvents={props.visible ? "auto" : "none"}
      behavior="position"
      style={styles.buttonContainer}
    >
      <TouchableScale onPress={props.onPress}>
        <Animated.View
          style={[
            styles.sendButton,
            {
              backgroundColor: props.active ? Colors.activeBackground1 : Colors.laterBackground1
            },
            buttonAnimatedStyle
          ]}
        >
          <Icon name={"ios-send"} color={"white"} size={36} />
        </Animated.View>
      </TouchableScale>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    paddingBottom: 30
  },
  sendButton: {
    borderRadius: 30,
    height: 60,
    width: 60,
    // backgroundColor: Colors.activeBackground1,
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SendButton;
