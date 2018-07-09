import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import { Navigation } from "react-native-navigation";

class AddMember extends Component {
  render() {
    return (
      <View style={{ padding: 50 }}>
        <Text>add group member!</Text>
        <Button title={"close"} onPress={() => Navigation.dismissModal(this.props.componentId)} />
      </View>
    );
  }
}

export default AddMember;
