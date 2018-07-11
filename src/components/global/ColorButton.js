import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { Colors } from "~/lib/styles";

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
    const { style = {} } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.props.onPress}
        style={[
          styles.button,
          style,
          {
            borderColor: this.props.color,
            backgroundColor: this.state.pressed ? this.props.color : "transparent"
          }
        ]}
      >
        <Text
          style={[
            this.props.textStyle,
            { color: this.state.pressed ? Colors.lightGray : this.props.color }
          ]}
        >
          {this.props.title}
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
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 5
  }
});

export default ColorButton;
