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

import { Colors, shadow } from "~/lib/styles";
import { SB_HEIGHT, SCREEN_WIDTH, CARD_GUTTER, BORDER_RADIUS } from "~/lib/constants";

import User from "../global/User";
import MapCard from "../global/MapCard";
import BackButton from "../global/BackButton";
import Group from "./Group";

const DATA = [
  {
    id: "1",
    name: "Alexi Christakis",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "2",
    name: "William Oles",
    size: 105,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "3",
    name: "Michelle Li",
    size: 6,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "4",
    name: "Janvi Trivedi",
    size: 63,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "5",
    name: "Max Golden",
    size: 105,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  },
  {
    id: "6",
    name: "Laszlo Gendler",
    size: 9,
    time: 1526598742850,
    photo: "https://graph.facebook.com/1825693684117541/picture"
  }
];

const markers = [
  {
    key: "1",
    coords: {
      latitude: 47.675598,
      longitude: -122.263837
    },
    title: "9pack",
    description: "dinner in pierson college"
  },
  {
    key: "2",
    coords: {
      latitude: 47.679239,
      longitude: -122.267227
    },
    title: "Fence Club",
    description: "sesh"
  },
  {
    key: "3",
    coords: {
      latitude: 47.663461,
      longitude: -122.284221
    },
    title: "Splash Bros",
    description: "splashing around"
  }
];

class GroupFocus extends Component {
  constructor(props) {
    super(props);

    this.entry = new Animated.Value(0);
    this.state = {
      data: DATA,
      renderedData: DATA.slice(0, 3),
      loading: true,
      listOpen: false,
      changedName: false,
      newName: ""
    };
  }

  componentDidMount() {
    Animated.timing(this.entry, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => this.setState({ loading: false }));
  }

  dismiss = () => {
    Animated.timing(this.entry, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
      Navigation.dismissOverlay(this.props.componentId);
      if (this.state.changedName) this.props.changeName(this.props.data, this.state.newName);
    });
  };

  onPressToggleLength = () => {
    if (!this.state.listOpen) this.setState({ listOpen: true, renderedData: this.state.data });
    else this.setState({ listOpen: false, renderedData: this.state.data.slice(0, 3) });
  };

  onPressPresentModalTo = () => {
    // ReactNativeHapticFeedback.trigger("impactLight");
    Navigation.showModal({
      component: {
        name: "sesh.AddToGroup",
        passProps: {
          ...this.props.data,
          statusBarHeight: this.props.statusBarHeight
        }
      }
    });
  };

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item, index }) => (
    <User length={this.state.data.length} index={index} data={item} />
  );

  // _renderHeader = () => {
  //   return <View style={styles.header} />;
  // };

  _renderSeparator = () => (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
  );

  _renderFooter = () => {
    return (
      <SuperEllipseMask radius={{ bottomRight: BORDER_RADIUS, bottomLeft: BORDER_RADIUS }}>
        <TouchableOpacity style={styles.footerContainer} onPress={this.onPressToggleLength}>
          <View style={styles.footerSeparator} />
          <Text style={styles.showMore}>{this.state.listOpen ? "show less" : "show more"}</Text>
        </TouchableOpacity>
      </SuperEllipseMask>
    );
  };

  updateGroupName = (id, newName) => {
    this.setState({ changedName: true, newName: newName });
    // api call to update the group name
  };

  render() {
    return (
      <FlatList
        style={{ marginVertical: CARD_GUTTER }}
        data={this.state.renderedData}
        keyExtractor={this._keyExtractor}
        // ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        ItemSeparatorComponent={this._renderSeparator}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: SB_HEIGHT,
    paddingHorizontal: CARD_GUTTER
  },
  header: {
    flex: 1,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  separatorContainer: {
    // width: SCREEN_WIDTH - 80,
    // marginLeft: 80,
    height: 1,
    backgroundColor: "white"
  },
  separator: {
    width: SCREEN_WIDTH - 50,
    marginLeft: 50,
    height: 0.5,
    backgroundColor: Colors.gray
  },
  footerContainer: {
    // flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  footerSeparator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 0.5,
    backgroundColor: Colors.gray
  },
  showMore: {
    color: Colors.groups,
    fontWeight: "bold",
    marginRight: 5
  }
});

export default GroupFocus;
