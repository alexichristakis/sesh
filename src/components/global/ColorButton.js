import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

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
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.props.onPress}
        style={[
          styles.button,
          {
            borderColor: this.props.color,
            backgroundColor: this.state.pressed ? this.props.color : "white"
          }
        ]}
      >
        <Text
          style={[this.props.textStyle, { color: this.state.pressed ? "white" : this.props.color }]}
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
