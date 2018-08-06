import React, { Component } from "react";
import { StyleSheet, Keyboard, View, Text, FlatList, TextInput, Image } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import { Navigation } from "react-native-navigation";

import BackButton from "../global/BackButton";
import SearchResult from "../global/SearchResult";

import { SCREEN_WIDTH, SCREEN_HEIGHT, SB_HEIGHT } from "../../lib/constants";
import { Colors, shadow } from "../../lib/styles";

class AddFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searched: "",
      results: []
    };
  }

  search = searched => {
    // this.setState({ searched });
    // var res = query("name")
    //   .startsWith(searched)
    //   .on(friends);
    // console.log(res);
    // this.setState({ results: res });
  };

  _renderItem = ({ item }) => <SearchResult data={item} />;

  _keyExtractor = item => item.uid.toString();

  // renderSeparator = () => {
  // 	return <View style={styles.separator} />;
  // };
  renderSeparator = () => {
    const separatorHeight = 1;
    return (
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.lightGray }}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1, paddingTop: 40, marginLeft: 20 }}
          data={this.state.results}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this._renderItem}
        />
        <VibrancyView style={{ position: "absolute", top: 0, left: 0, right: 0 }} blurType="xlight">
          <TextInput
            style={styles.input}
            autoFocus
            autoCapitalize={"words"}
            placeholder={"name"}
            placeholderTextColor={Colors.gray}
            onChangeText={searched => this.search(searched)}
          />
        </VibrancyView>

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
  separatorContainer: {
    width: SCREEN_WIDTH,
    borderRadius: 2,
    overflow: "hidden",
    height: 1
  },
  separator: {
    position: "absolute",
    top: 0,
    left: 50,
    right: 0,
    height: 1,
    backgroundColor: Colors.mediumGray
  },
  input: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: SB_HEIGHT,
    paddingHorizontal: 20,
    fontSize: 28,
    fontWeight: "800"
  }
});

export default AddFriend;
