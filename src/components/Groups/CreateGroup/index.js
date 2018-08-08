import React, { Component } from "react";
import { Animated, View, FlatList, Text, Image } from "react-native";

import { Navigation } from "react-native-navigation";

import BackButton from "../../global/BackButton";
import User from "../../global/User";
import Header from "./Header";
import Footer from "./Footer";

import { SB_HEIGHT } from "../../../lib/constants";

class CreateGroup extends Component {
  _renderItem = ({ item }) => <User data={item} />;

  _keyExtractor = item => item.id.toString();

  render() {
    const { friends } = this.props;
    console.log(friends);

    return (
      <View style={{ flex: 1 }}>
        <Animated.ScrollView style={{ flex: 1 }}>
          <FlatList
            style={{ paddingTop: 50 }}
            data={friends}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </Animated.ScrollView>
        <Header />
        <Footer />
        <BackButton onPressPop={() => Navigation.dismissModal(this.props.componentId)} />
      </View>
    );
  }
}

export default CreateGroup;
