import React, { Component } from "react";
import { StyleSheet, Keyboard, View, Text, TextInput } from "react-native";

import { Navigation } from "react-native-navigation";

import SelectGroup from "./SelectGroup";
import BackButton from "../global/BackButton";

import { Colors } from "../../lib/styles";
import { SB_HEIGHT } from "../../lib/constants";

const data = [
  {
    id: "1",
    name: "9pack",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "2",
    name: "Fence Club",
    size: 105,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "3",
    name: "Splash Bros",
    size: 6,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "4",
    name: "Frisbee",
    size: 63,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "5",
    name: "Fence Club",
    size: 105,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "6",
    name: "9pack",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  }
];

class CreateActiveMove extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: SB_HEIGHT + 10, paddingHorizontal: 15 }}>
        <TextInput
          autoFocus
          multiline
          style={styles.name}
          onChangeText={text => this.setState({ text })}
          placeholder={"What's going on?"}
          placeholderTextColor={Colors.gray}
        />
        <SelectGroup data={data} />
        <BackButton
          onPressPop={() => {
            Keyboard.dismiss();
            Navigation.dismissModal(this.props.componentId);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "300"
    // color: "white"
  }
});

export default CreateActiveMove;
