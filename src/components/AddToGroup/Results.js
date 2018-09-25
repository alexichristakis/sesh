import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableHighlight } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import User from "../global/User";

import { CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";
import { SeparatorStyles, TextStyles, Colors } from "../../lib/styles";

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };
  }

  renderUser = ({ item, index }) => {
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        activeOpacity={0.8}
        underlayColor={Colors.mediumGray}
        onPress={() => this.handleOnPressUser(item)}
      >
        <User selectable selected={this.isSelected({ uid: item.uid })} user={item} />
      </TouchableHighlight>
    );
  };

  renderSeparator = () => <View style={SeparatorStyles.users} />;

  _keyExtractor = item => item.uid.toString();

  isSelected = ({ uid }) => {
    const { selected } = this.state;
    if (selected.includes(uid)) return true;
    else return false;
  };

  handleOnPressUser = user => {
    const { addToGroup } = this.props;
    this.setState(
      {
        selected: [...this.state.selected, user.uid]
      },
      () => addToGroup(user)
    );
  };

  renderEmptyListComponent = () => (
    <Text style={[TextStyles.body, styles.empty]}>Begin typing to search</Text>
  );

  render() {
    const { data } = this.props;
    return (
      <SuperEllipseMask
        style={{ marginVertical: CARD_GUTTER, backgroundColor: "white" }}
        radius={BORDER_RADIUS}
      >
        <FlatList
          scrollEnabled={false}
          style={{ flex: 1 }}
          data={data}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={this.renderEmptyListComponent}
          renderItem={this.renderUser}
        />
      </SuperEllipseMask>
    );
  }
}

const styles = StyleSheet.create({
  empty: {
    padding: 20
  }
});

export default Results;
