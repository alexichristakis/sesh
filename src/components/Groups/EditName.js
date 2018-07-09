import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import { Navigation } from "react-native-navigation";

class EditName extends Component {
  render() {
    return (
      <View style={{ padding: 50 }}>
        <Text>edit name screen!</Text>
        <Button title={"close"} onPress={() => Navigation.dismissModal(this.props.componentId)} />
      </View>
    );
  }
}

export default EditName;
