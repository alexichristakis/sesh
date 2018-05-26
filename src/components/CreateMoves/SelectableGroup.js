import React, { Component } from "react";
import {
  LayoutAnimation,
  Easing,
  Animated,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";

const ICON_SIZE = 35;

class SelectableGroup extends Component {
  constructor(props) {
    super(props);

    this.animated = new Animated.Value(1);
  }

  handlePressIn = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    Animated.spring(this.animated, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  handlePressOut = () => {
    setTimeout(() => {
      ReactNativeHapticFeedback.trigger("impactLight");
    }, 10);
    Animated.spring(this.animated, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  render() {
    const group = this.props.data;

    let containerAnimatedStyle = {
      transform: [
        {
          scale: this.animated
        }
      ]
    };

    return (
      <Animated.View
        ref={item => (this.view = item)}
        style={[styles.container, containerAnimatedStyle]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.button}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          onPress={() => console.log("pressed")}
        >
          <View style={styles.pictures}>
            <Image style={styles.image1} source={{ uri: group.photo }} />
            <Image style={styles.image2} source={{ uri: group.photo }} />
            <Image style={styles.image3} source={{ uri: group.photo }} />
          </View>
          <View style={styles.mid}>
            <Text style={styles.name}>{group.name}</Text>
            <Text style={styles.size}>{group.size} members</Text>
          </View>
          <Text style={styles.time}>{TimeAgo(group.time)}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 5,
    marginBottom: 10,
    ...shadow
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    // position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.gray,
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    width: ICON_SIZE
  },
  name: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "900"
    // color: Colors.currently,
  },

  time: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "300",
    color: Colors.gray
  }
});

export default SelectableGroup;
