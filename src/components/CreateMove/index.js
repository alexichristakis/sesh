import React, { Component } from "react";
import { StyleSheet, Keyboard, Animated, View } from "react-native";

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
import SendButton from "./SendButton";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  IS_X,
  TRANSITION_DURATION,
  CARD_GUTTER
} from "~/lib/constants";
import { Colors, shadow, FillAbsolute } from "~/lib/styles";

const yOffset = new Animated.Value(0);

class CreateMove extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);
    this.buttonScale = new Animated.Value(0);

    // yOffset.addListener(this.handleCheckIfSnap);
    yOffset.addListener(() => {});
    this.state = {
      open: false,
      buttonVisible: false,
      readyToSend: false,
      currentDate: new Date(),
      chosenDate: new Date(),
      selectedIndex: null,
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

  componentWillUnmount() {
    yOffset.removeAllListeners();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.open !== nextState.open) return true;
    else if (this.state.chosenDate !== nextState.chosenDate) return true;
    else if (this.state.selectedIndex !== nextState.selectedIndex) return true;
    else if (this.state.buttonVisible !== nextState.buttonVisible) return true;
    else return false;
  }

  handleOnScroll = Animated.event([{ nativeEvent: { contentOffset: { y: yOffset } } }], {
    useNativeDriver: true
  });

  handleVertScrollRelease = event => {
    const { changedTouches, locationY, pageY } = event.nativeEvent;
    if (yOffset._value < -50) {
      this.setState({ buttonVisible: false }, () => {
        Keyboard.dismiss();
        this.interactable.snapTo({ index: 0 });
      });
    }
  };

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    if (index === 0) {
      this.setState({ open: false }, () => Navigation.dismissModal(this.props.componentId));
    } else {
      this.setState({ open: true }, () => this.checkButtonOpen());
    }
  };

  handleOnDrag = event => {
    const { y } = event.nativeEvent;
    this.setState({ buttonVisible: false });
    Keyboard.dismiss();
    this.scroll.getNode().scrollTo({ x: 0, y: 0, animated: true });
  };

  handleOnPressDismiss = () => {
    this.setState({ open: false, buttonVisible: false }, () => {
      Keyboard.dismiss();
      this.scroll.getNode().scrollTo({ x: 0, y: 0, animated: true });
      this.interactable.snapTo({ index: 0 });
    });
  };

  handleOnPressSelect = index => {
    this.setState({ selectedIndex: index }, () => this.checkButtonOpen());
  };

  handleOnChangeText = text => {
    this.setState({ text }, () => this.checkButtonOpen());
  };

  handleOnChangeDate = date => {
    this.setState({ chosenDate: date });
  };

  checkButtonOpen = () => {
    const { selectedIndex, text } = this.state;
    if (selectedIndex !== null && text !== "") {
      this.setState({ buttonVisible: true });
    } else {
      this.setState({ buttonVisible: false });
    }
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
      opacity: yOffset.interpolate({
        inputRange: [0, 30],
        outputRange: [0, 1],
        extrapolate: "clamp"
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

    let animatedScroll = {
      transform: [
        {
          translateY: yOffset.interpolate({
            inputRange: [-SCREEN_HEIGHT - 500, 0, 5],
            outputRange: [SCREEN_HEIGHT, 0, 0]
          })
        }
      ]
    };

    let region = {
      ...this.state.coords,
      latitudeDelta: 0.0044,
      longitudeDelta: 0.0044
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[FillAbsolute, opacity]}>
          <BlurView blurType="dark" style={styles.flex} />
        </Animated.View>
        {/* <Animated.View style={[FillAbsolute, opacity, { backgroundColor: "rgba(0,0,0,0.8)" }]} /> */}

        <Animated.ScrollView
          ref={view => (this.scroll = view)}
          onResponderRelease={this.handleVertScrollRelease}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={16}
          scrollEnabled={this.state.scrollEnabled}
          keyboardDismissMode={"interactive"}
          showsVerticalScrollIndicator={false}
          style={[styles.scroll, animatedTranslate]}
          contentContainerStyle={styles.scrollContent}
        >
          <MapCard
            draggable
            active={this.props.active}
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
              onDateChange={this.handleOnChangeDate}
            />
          )}
          <GroupSelectionCard
            groups={this.props.groups}
            selectedIndex={this.state.selectedIndex}
            onPressSelect={this.handleOnPressSelect}
          />
        </Animated.ScrollView>

        <Animated.View style={[styles.shadowContainer, shadowOpacity]}>
          <LinearGradient
            style={{ flex: 1 }}
            locations={[0.25, 0.5, 1]}
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          />
        </Animated.View>

        <Interactable.View
          animatedNativeDriver
          verticalOnly
          ref={item => (this.interactable = item)}
          style={[styles.interactable, animatedScroll]}
          snapPoints={[closed, open]}
          onSnap={this.handleOnSnap}
          onDrag={this.handleOnDrag}
          initialPosition={closed}
          animatedValueY={this.deltaY}
        >
          <TextEntryCard
            active={this.props.active}
            onChangeText={this.handleOnChangeText}
            onPressDismiss={this.handleOnPressDismiss}
          />
        </Interactable.View>

        <SendButton
          active={this.props.active}
          visible={this.state.buttonVisible}
          onPress={this.handleSendMove}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  scroll: {
    paddingTop: IS_X ? 33 : 43,
    paddingHorizontal: CARD_GUTTER
  },
  scrollContent: {
    paddingBottom: 90
  },
  interactable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: CARD_GUTTER
  },
  shadowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SB_HEIGHT + 75
  }
});

export default CreateMove;
