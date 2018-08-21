import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  Keyboard,
  TouchableOpacity,
  View,
  Text,
  TextInput
} from "react-native";

import { Navigation } from "react-native-navigation";
import Interactable from "react-native-interactable";
import SuperEllipseMask from "react-native-super-ellipse-mask";

import ColorButton from "../global/ColorButton";

import { ShowEditGroupName, ShowAddToGroup } from "../../lib/navigation";
import { Colors, FillAbsolute } from "../../lib/styles";
import { SCREEN_HEIGHT, BORDER_RADIUS } from "../../lib/constants";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);

    this.state = {
      groupName: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
    }, 5);
  }

  dismiss = () => {
    Keyboard.dismiss();
    this.interactable.snapTo({ index: 0 });
  };

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 0) Navigation.dismissModal(this.props.componentId);
  };

  handleOnPressEditName = () => {
    const { group } = this.props;
    // ShowEditGroupName({ group });
    this.input.focus();
  };

  handleOnPressAddMember = () => {
    const { group } = this.props;
    ShowAddToGroup({ group });
  };

  handleOnPressLeaveGroup = () => {
    const { leaveGroup, group, user } = this.props;
    leaveGroup(group, user);
    this.dismiss();
  };

  handleOnChangeText = text => {
    this.setState({ groupName: text });
  };

  handleChangeGroupName = () => {
    const { groupName } = this.state;
    const { group, changeGroupName } = this.props;

    changeGroupName(group.id, groupName);
    // console.log(id, " is now ", groupName);
  };

  render() {
    console.log(this.props);
    const { group } = this.props;
    const { name } = group;

    let animatedOpacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SCREEN_HEIGHT / 2 - 100, SCREEN_HEIGHT],
        outputRange: [1, 0]
      })
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity style={FillAbsolute} activeOpacity={0.9} onPress={this.dismiss}>
          <Animated.View style={[styles.background, animatedOpacity]} />
        </TouchableOpacity>
        <Interactable.View
          animatedNativeDriver
          verticalOnly
          enablesReturnKeyAutomatically={true}
          ref={Interactable => (this.interactable = Interactable)}
          snapPoints={[
            { y: SCREEN_HEIGHT, damping: 0.5, tension: 600 },
            { y: SCREEN_HEIGHT / 2 - 100, damping: 0.5, tension: 600 }
          ]}
          onSnap={this.handleOnSnap}
          initialPosition={{ y: SCREEN_HEIGHT }}
          animatedValueY={this.deltaY}
        >
          <SuperEllipseMask style={styles.interactable} radius={20}>
            {/*<Text style={styles.name}>{name}</Text>*/}
            <TextInput
              ref={TextInput => (this.input = TextInput)}
              onChangeText={this.handleOnChangeText}
              onSubmitEditing={this.handleChangeGroupName}
              placeholder={this.props.group.name}
              style={styles.name}
              returnKeyType="go"
              // autoFocus
              placeholderTextColor={Colors.primary}
              selectionColor={Colors.primary}
              maxLength={15}
            />
            <ColorButton
              textStyle={styles.textStyle}
              title={"edit name"}
              color={Colors.primary}
              onPress={this.handleOnPressEditName}
            />
            <ColorButton
              textStyle={styles.textStyle}
              title={"add members"}
              color={Colors.primary}
              onPress={this.handleOnPressAddMember}
            />
            <ColorButton
              textStyle={styles.textStyle}
              title={"leave group"}
              color={Colors.primary}
              onPress={this.handleOnPressLeaveGroup}
            />
            <TouchableOpacity
              style={{ alignSelf: "center", paddingTop: 10 }}
              onPress={this.dismiss}
            >
              <Text style={{ color: Colors.primary, fontSize: 16 }}>cancel</Text>
            </TouchableOpacity>
          </SuperEllipseMask>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50
  },
  background: {
    ...FillAbsolute,
    backgroundColor: "rgba(130,130,130,0.4)"
  },
  interactable: {
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20
  },
  name: {
    alignSelf: "center",
    color: Colors.primary,
    fontSize: 20,
    marginBottom: 10
  },
  textStyle: {
    fontSize: 14
  }
});

export default Settings;
