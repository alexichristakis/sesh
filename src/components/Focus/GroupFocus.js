import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import { Colors, TextStyles, SeparatorStyles, shadow } from "../../lib/styles";
import { SB_HEIGHT, SCREEN_WIDTH, CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";

import LoadingCircle from "../global/LoadingCircle";
import User from "../global/User";

class GroupFocus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { fetchGroupMembers, cardData } = this.props;
    fetchGroupMembers(cardData.id).then(() => this.setState({ loading: false }));
  }

  renderUser = ({ item, index }) => <User user={item} />;

  renderSeparator = () => <View style={SeparatorStyles.users} />;

  _keyExtractor = item => item.uid.toString();

  render() {
    const { groups, cardData } = this.props;
    const { loading } = this.state;
    const members = groups.find(o => o.id === cardData.id).members;
    console.log(members);
    if (loading) return <LoadingCircle style={styles.loading} size={20} />;
    else
      return (
        <>
          <Text style={TextStyles.headerWhite}>GROUP MEMBERS</Text>
          <SuperEllipseMask style={styles.container} radius={BORDER_RADIUS}>
            <FlatList
              data={members}
              keyExtractor={this._keyExtractor}
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={this.renderUser}
            />
          </SuperEllipseMask>
        </>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: CARD_GUTTER,
    backgroundColor: "white"
  },
  loading: {
    alignSelf: "center",
    marginTop: 50
  }
});

export default GroupFocus;
