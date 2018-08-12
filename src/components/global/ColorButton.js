import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { Colors, TextStyles } from "../../lib/styles";

class ColorButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pressed: false
    };
  }

  handlePressIn = () => {
    this.setState({ pressed: true });
  };

  handlePressOut = () => {
    this.setState({ pressed: false });
  };

  render() {
    const {
      style = styles.button,
      textStyle = TextStyles.body,
      borderRadius = 20,
      onPress,
      color,
      title
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={onPress}
        style={[
          style,
          {
            borderRadius,
            borderColor: color,
            backgroundColor: this.state.pressed ? color : "transparent"
          }
        ]}
      >
        <Text style={[textStyle, { color: this.state.pressed ? Colors.lightGray : color }]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    // borderRadius: 20,
    borderWidth: 1,
    marginVertical: 5
  }
});

export default ColorButton;
