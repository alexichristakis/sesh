import React, { Component } from "react";
import { StyleSheet, Keyboard, Animated, View, Text } from "react-native";

import Interactable from "react-native-interactable";
import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { BlurView } from "react-native-blur";
import LinearGradient from "react-native-linear-gradient";

import TextEntryCard from "./TextEntryCard";
import DatePicker from "./DatePicker";
import MapCard from "../global/MapCard";
import GroupSelectionCard from "./GroupSelectionCard";
import SendButton from "./SendButton";
import SelectUsers from "../CreateGroup/SelectUsers";

import { SCREEN_HEIGHT, SB_HEIGHT, IS_X, CARD_GUTTER } from "../../lib/constants";
import { FillAbsolute, TextStyles } from "../../lib/styles";
import { ShowLoadingOverlay, HideLoadingOverlay } from "../../lib/navigation";

import { SendMove } from "../../api";

const yOffset = new Animated.Value(0);

class CreateMove extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);
    this.buttonScale = new Animated.Value(0);

    this.state = {
      open: false,
      buttonVisible: false,
      readyToSend: false,
      currentDate: new Date(),
      chosenDate: new Date(),
      selectedIndex: null,
      loading: true,
      location: {
        latitude: 0,
        longitude: 0
      },
      text: ""
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ location: position.coords, loading: false });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
    }, 5);
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

  handleScrollEndDrag = ({ nativeEvent }) => {
    const { y } = nativeEvent.contentOffset;
    if (y < -75) {
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
    } else if (index === 1) {
      this.setState({ open: true }, () => this.checkButtonOpen());
    } else {
      this.setState({ open: false }, () => Navigation.dismissModal(this.props.componentId));
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
    this.setState({ location: { latitude, longitude } });
  };

  handleOnPressSend = () => {
    const { user, groups, addMove } = this.props;
    const { text: description, location, chosenDate, selectedIndex } = this.state;

    const { name: sender_name, uid, fb_id } = user;
    const { name: group_name, id: group_id } = groups[selectedIndex];
    const time = new Date(chosenDate).getTime();

    const move = {
      id: user.uid + time.toString(),
      ts: Date.now(),
      ended: false,
      description,
      location,
      sender_name,
      group_id,
      group_name,
      time,
      uid,
      fb_id
    };

    this.setState({ buttonVisible: false }, () => {
      ReactNativeHapticFeedback.trigger("impactHeavy");
      Keyboard.dismiss();
      addMove(move).then(() => this.interactable.snapTo({ index: 2 }));
    });
  };

  render() {
    const springConfig = { damping: 0.5, tension: 600 };
    const closed = { y: SCREEN_HEIGHT, ...springConfig };
    const open = { y: SB_HEIGHT, ...springConfig };
    const sent = { y: -510, ...springConfig };

    let opacity = {
      opacity: this.deltaY.interpolate({
        inputRange: [-510, SB_HEIGHT, SCREEN_HEIGHT],
        outputRange: [0, 1, 0]
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
      ...this.state.location,
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
          onScrollEndDrag={this.handleScrollEndDrag}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={16}
          scrollEnabled={this.state.scrollEnabled}
          keyboardDismissMode={"interactive"}
          showsVerticalScrollIndicator={false}
          style={[styles.scroll, animatedTranslate]}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={TextStyles.headerWhite}>LOCATION</Text>
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
            <>
              <Text style={TextStyles.headerWhite}>TIME</Text>
              <DatePicker
                currentDate={this.state.currentDate}
                chosenDate={this.state.chosenDate}
                onDateChange={this.handleOnChangeDate}
              />
            </>
          )}
          <Text style={TextStyles.headerWhite}>GROUP</Text>
          <GroupSelectionCard
            groups={this.props.groups}
            selectedIndex={this.state.selectedIndex}
            onPressSelect={this.handleOnPressSelect}
          />
          <SelectUsers friends={this.props.friends} />
        </Animated.ScrollView>

        {/* <Animated.View style={[styles.shadowContainer, shadowOpacity]}>
          <LinearGradient
            style={{ flex: 1 }}
            locations={[0.25, 0.5, 1]}
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          />
        </Animated.View> */}

        <Interactable.View
          animatedNativeDriver
          verticalOnly
          ref={item => (this.interactable = item)}
          style={[styles.interactable, animatedScroll]}
          snapPoints={[closed, open, sent]}
          onSnap={this.handleOnSnap}
          onDrag={this.handleOnDrag}
          initialPosition={closed}
          animatedValueY={this.deltaY}
        >
          <Animated.View style={[styles.shadowContainer, shadowOpacity]}>
            <LinearGradient
              style={styles.flex}
              locations={[0.25, 0.5, 1]}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
            />
          </Animated.View>
          <TextEntryCard
            active={this.props.active}
            onChangeText={this.handleOnChangeText}
            onPressDismiss={this.handleOnPressDismiss}
          />
        </Interactable.View>

        <SendButton
          active={this.props.active}
          visible={this.state.buttonVisible}
          onPress={this.handleOnPressSend}
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
    height: 75
  }
});

export default CreateMove;
