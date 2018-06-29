import React, { Component } from "react";
import { StyleSheet, Keyboard, Animated, ScrollView, View, Text, TextInput } from "react-native";

import moment from "moment";
import Interactable from "react-native-interactable";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

import TextEntryCard from "./TextEntryCard";
import DatePicker from "./DatePicker";
import MapCard from "../global/MapCard";
import TouchableScale from "../global/TouchableScale";
import GroupSelectionCard from "./GroupSelectionCard";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  TRANSITION_DURATION,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

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

class CreateMove extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);
    this.state = {
      currentDate: new Date(),
      chosenDate: new Date(),
      selectedIndex: null,
      open: false,
      loading: true,
      coords: {
        latitude: 0,
        longitude: 0
      },
      text: ""
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ coords: position.coords, loading: false });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
    }, 5);
  }

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 0) {
      this.setState({ open: false }, () => Navigation.dismissOverlay(this.props.componentId));
    } else {
      this.setState({ open: true });
    }
  };

  handleOnDrag = event => {
    const { y } = event.nativeEvent;
    this.scroll.getNode().scrollTo({ x: 0, y: 0, animated: true });
  };

  handleOnPressDismiss = () => {
    this.setState({ open: false }, () => {
      this.scroll.getNode().scrollTo({ x: 0, y: 0, animated: true });
      this.interactable.snapTo({ index: 0 });
    });
  };

  handleOnRegionChange = region => {
    const { latitude, longitude } = region;
    this.setState({ coords: { latitude, longitude } });
  };

  handleSendMove = () => {
    const move = {
      groupID: this.state.selectedIndex,
      location: this.state.coords,
      description: this.state.text,
      date: this.state.chosenDate
    };

    console.log(move);
  };

  render() {
    const closed = { y: SCREEN_HEIGHT, damping: 0.5, tension: 600 };
    const open = { y: SB_HEIGHT, damping: 0.5, tension: 600 };

    let opacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT, SCREEN_HEIGHT],
        outputRange: [1, 0]
      })
    };

    let shadowOpacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT, SB_HEIGHT + 2, SCREEN_HEIGHT],
        outputRange: [1, 0, 0]
      })
    };

    let buttonOpacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [SB_HEIGHT, SCREEN_HEIGHT / 2, SCREEN_HEIGHT],
        outputRange: [1, 0, 0]
      })
    };

    let animatedTranslate = {
      transform: [
        {
          translateY: this.deltaY.interpolate({
            inputRange: [0, SCREEN_HEIGHT],
            outputRange: [0, SCREEN_HEIGHT + 500]
          })
        }
      ]
    };

    let region = {
      ...this.state.coords,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[FillAbsolute, opacity]}>
          <BlurView blurType="dark" blurAmount={10} style={[FillAbsolute]} />
        </Animated.View>

        <Animated.ScrollView
          ref={view => (this.scroll = view)}
          scrollEnabled={this.state.scrollEnabled}
          showsVerticalScrollIndicator={false}
          style={[
            animatedTranslate,
            { paddingTop: SB_HEIGHT === 40 ? 35 : 45, paddingHorizontal: CARD_GUTTER }
          ]}
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          <MapCard
            draggable
            height={300}
            initialRegion={region}
            style={{ marginVertical: CARD_GUTTER }}
            onRegionChangeComplete={this.handleOnRegionChange}
            loading={!this.state.open || this.state.loading}
          />
          {!this.props.active && (
            <DatePicker
              currentDate={this.state.currentDate}
              chosenDate={this.state.chosenDate}
              onDateChange={date => this.setState({ chosenDate: date })}
            />
          )}
          <GroupSelectionCard
            selectedIndex={this.state.selectedIndex}
            onPressSelect={index => this.setState({ selectedIndex: index })}
          />
        </Animated.ScrollView>

        <Interactable.View
          animatedNativeDriver
          ref={item => (this.interactable = item)}
          style={styles.interactable}
          verticalOnly={true}
          snapPoints={[closed, open]}
          onSnap={this.handleOnSnap}
          onDrag={this.handleOnDrag}
          initialPosition={closed}
          animatedValueY={this.deltaY}
        >
          <Animated.View
            style={[
              { position: "absolute", top: -SB_HEIGHT, left: 0, right: 0, height: SB_HEIGHT + 70 },
              shadowOpacity
            ]}
          >
            <LinearGradient
              style={{ flex: 1 }}
              locations={[0.5, 1]}
              colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
            />
          </Animated.View>

          <TextEntryCard
            onChangeText={text => this.setState({ text })}
            onPressDismiss={this.handleOnPressDismiss}
          />
        </Interactable.View>
        {this.state.selectedIndex !== null &&
          this.state.text !== "" && (
            <View style={styles.buttonContainer}>
              <TouchableScale onPress={this.handleSendMove}>
                <Animated.View style={[styles.sendButton, buttonOpacity]}>
                  <Icon name={"ios-send"} color={"white"} size={36} />
                </Animated.View>
              </TouchableScale>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "300"
    // color: "white"
  },
  buttonContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: 50
  },
  sendButton: {
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: Colors.activeBackground1,
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  interactable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    // bottom: 0,
    padding: CARD_GUTTER
  }
});

export default CreateMove;
