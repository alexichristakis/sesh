import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import SelectableGroup from "./SelectableGroup";

class SelectGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: null
    };
  }

  onPressGroup = index => {
    this.setState({ selectedIndex: index });
  };

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => <SelectableGroup selected={this.state.selectedIndex} data={item} />;

  render() {
    return (
      <FlatList
        data={this.props.data}
        style={styles.list}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});

export default SelectGroup;
