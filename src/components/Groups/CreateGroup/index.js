import React, { Component } from "react";
import { StyleSheet, Animated, Keyboard, View, FlatList, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";

import BackButton from "../../global/BackButton";
import User from "../../global/User";
import Header from "./Header";
import Footer from "./Footer";

import { SB_HEIGHT, LOADING } from "../../../lib/constants";
import { Colors } from "../../../lib/styles";
import { ShowLoadingOverlay, HideLoadingOverlay } from "../../../lib/navigation";

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.yOffset = new Animated.Value(0);

    this.state = {
      groupName: "",
      selectedUsers: []
    };
  }

  componentDidMount() {
    this.yOffset.addListener(() => {});
  }

  componentWillUnmount() {
    this.yOffset.removeAllListeners();
  }

  _onScroll = () =>
    Animated.event([{ nativeEvent: { contentOffset: { y: this.yOffset } } }], {
      useNativeDriver: true
    });

  handleScrollRelease = event => {
    const { changedTouches, locationY, pageY } = event.nativeEvent;
    if (this.yOffset._value < -75) {
      Keyboard.dismiss();
      Navigation.dismissModal(this.props.componentId);
    }
  };

  handleOnNameChange = groupName => {
    this.setState({ groupName });
  };

  handleOnPressCreateGroup = () => {
    const { groupName, selectedUsers } = this.state;
    console.log(groupName, selectedUsers);
    ShowLoadingOverlay();
    setTimeout(() => {
      HideLoadingOverlay();
      Navigation.dismissModal(this.props.componentId);
    }, 500);
    /* make api call */
  };

  _renderItem = ({ item, index }) => (
    <User
      selectable
      selected={this.state.selectedUsers.includes(item.uid)}
      user={item}
      onPress={this.handleOnPressUser}
    />
  );

  _renderSeparator = () => <View style={styles.separator} />;

  _keyExtractor = item => item.uid.toString();

  handleOnPressUser = ({ uid }) => {
    const { selectedUsers } = this.state;
    if (selectedUsers.includes(uid)) {
      let index = selectedUsers.indexOf(uid);
      this.setState({
        selectedUsers: [...selectedUsers.slice(0, index), ...selectedUsers.slice(index + 1)]
      });
    } else {
      this.setState({ selectedUsers: [...selectedUsers, uid] });
    }
  };

  render() {
    console.log(this.props);
    const { friends } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          onScroll={this._onScroll()}
          onResponderRelease={this.handleScrollRelease}
          scrollEventThrottle={16}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <FlatList
            style={{ paddingTop: 50 }}
            data={friends}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this._renderSeparator}
            renderItem={this._renderItem}
          />
        </Animated.ScrollView>
        <Header onChangeName={this.handleOnNameChange} />
        <Footer onPressCreateGroup={this.handleOnPressCreateGroup} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    left: 20,
    right: 0,
    height: 1,
    backgroundColor: Colors.mediumGray
  }
});

export default CreateGroup;
