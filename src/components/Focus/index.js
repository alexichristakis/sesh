import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Interactable from "react-native-interactable";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import LinearGradient from "react-native-linear-gradient";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import TouchableScale from "../global/TouchableScale";
import Move from "../global/Move";
import Group from "../Groups/Group";
import ActiveFocus from "./ActiveFocus";
import LaterFocus from "./LaterFocus";
import GroupFocus from "./GroupFocus";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  BORDER_RADIUS,
  TRANSITION_DURATION,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

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

class Focus extends Component {
  constructor(props) {
    super(props);
    const { height = 0, width, x, y, pageX, pageY = SCREEN_HEIGHT } = this.props;

    this.yOffset = new Animated.Value(0);
    this.xOffset = new Animated.Value(0);

    this.deltaY = new Animated.Value(pageY);

    this.state = {
      open: false,
      transitioning: true,
      sourceDimension: {
        height,
        width,
        x,
        y,
        pageX,
        pageY
      }
    };
  }

  componentDidMount() {
    const { isGroups, fetchGoingUsers, cardData } = this.props;
    if (!isGroups) fetchGoingUsers(cardData.id);

    this.beginTransition();
    // /* fetch users who have joined move */
    // setTimeout(() => {
    //   this.setState({ loading: false });
    // }, 500);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // const { loading, open, sourceDimension } = this.state;

    // // if (loading !== nextState.loading) return true;
    // // else if (open !== nextState.open) return true;
    // if (sourceDimension.height !== nextState.sourceDimension.height)
    //   return true;
    // else return false;
    return true;
  }

  measureCard = ({ nativeEvent }) => {
    const { height, width, x, y, pageX, pageY } = nativeEvent.layout;
    this.setState(({ sourceDimension }) => {
      return {
        sourceDimension: {
          ...sourceDimension,
          height
        }
      };
    });
  };

  beginTransition = () => {
    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
    }, 5);
  };

  handleOnDrag = event => {
    const { state, x, y } = event.nativeEvent;
    // if (state === "start" && !this.props.groups)
    //   this.horizScrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
  };

  handleClose = () => {
    this.setState({ transitioning: true }, () => {
      if (!this.props.isGroups)
        this.horizScrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
      this.interactable.snapTo({ index: 0 });
    });
  };

  handleScrollEndDrag = ({ nativeEvent }) => {
    const { y } = nativeEvent.contentOffset;
    if (y < -75) this.handleClose();
    // console.log(event.nativeEvent);
  };

  handleOnSnap = event => {
    const { index } = event.nativeEvent;
    const { isGroups } = this.props;
    if (index === 0) {
      if (!isGroups) {
        this.props.onReturn().then(() => {
          // const moveId = this.props.cardData.id;
          // if (this.state.joined && !this.props.joined) this.props.joinMove(moveId);
          // else if (!this.state.joined && this.props.joined) this.props.leaveMove(moveId);
          this.props.returnScreen();
          Navigation.dismissModal(this.props.componentId);
        });
      } else {
        this.setState({ open: false, transitioning: false }, () =>
          Navigation.dismissModal(this.props.componentId)
        );
      }
    } else {
      this.setState({ open: true, transitioning: false });
    }
  };

  vertOnScroll = () =>
    Animated.event([{ nativeEvent: { contentOffset: { y: this.yOffset } } }], {
      useNativeDriver: true
    });

  horizOnScroll = () =>
    Animated.event([{ nativeEvent: { contentOffset: { x: this.xOffset } } }], {
      useNativeDriver: true
    });

  handleOnPressJoin = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    // this.setState({ joined: !this.state.joined });
    const { joinMove, cardData } = this.props;
    joinMove(cardData.id).then(() => console.log("done!"));
  };

  render() {
    const { isGroups, isActive, fetchingGoingUsers, cardData, moves, user } = this.props;
    const { open, loading, transitioning, sourceDimension } = this.state;
    const { height, width, x, y, pageX, pageY } = sourceDimension;
    // console.log("update focus: ", this.props);

    const openOffset = SB_HEIGHT + CARD_GUTTER;
    const closedOffset = this.props.isGroups ? SCREEN_HEIGHT + 500 : SCREEN_HEIGHT;
    const inputRange = openOffset < pageY ? [openOffset, pageY] : [pageY, openOffset];

    const springConfig = { damping: 0.5, tension: 600 };
    const interactableSnapPoints = [
      { y: pageY, ...springConfig },
      { y: SB_HEIGHT + CARD_GUTTER, ...springConfig }
    ];

    let opacity = {
      opacity: this.deltaY.interpolate({
        inputRange,
        outputRange: openOffset < pageY ? [1, 0] : [0, 1]
      })
    };

    let shadowOpacity = {
      opacity: this.yOffset.interpolate({
        inputRange: [0, 30],
        outputRange: [0, 1],
        extrapolate: "clamp"
      })
    };

    const groupsPadding = height - 20 + CARD_GUTTER;
    const movePadding = height - 40 + CARD_GUTTER;
    let focusContainerStyle = {
      // ...FillAbsolute,
      flex: 1,
      top: 20,
      paddingTop: isGroups ? groupsPadding : movePadding,
      paddingHorizontal: CARD_GUTTER,
      transform: [
        {
          translateY: this.deltaY.interpolate({
            inputRange,
            outputRange: openOffset < pageY ? [SB_HEIGHT, closedOffset] : [SCREEN_HEIGHT, SB_HEIGHT]
          })
        }
      ]
    };

    let animatedScroll = {
      // bottom: SCREEN_HEIGHT - height - CARD_GUTTER,
      // bottom: 0,
      transform: [
        {
          translateY: this.yOffset.interpolate({
            inputRange: [-closedOffset / 2, 0, 5],
            outputRange: [pageY / 2, 0, 0],
            extrapolate: "clamp"
          })
        }
      ]
    };

    let buttonAnimatedStyle = {
      transform: [
        {
          scale: this.xOffset.interpolate({
            inputRange: [0, SCREEN_WIDTH / 2],
            outputRange: [0, 1],
            extrapolate: "clamp"
          })
        }
      ]
    };

    let gradientContainerStyle = [
      {
        position: "absolute",
        top: height / 2,
        left: 0,
        right: 0,
        height: height / 2 + 15
      },
      shadowOpacity
    ];

    let endMoveComputedStyle = [
      styles.endMoveButton,
      {
        width: SCREEN_WIDTH / 2,
        height: height,
        paddingRight: CARD_GUTTER
      }
    ];

    const Card = isGroups ? (
      <Group card data={cardData} />
    ) : (
      <Move focused active={isActive} move={cardData} userLocation={user.location} />
    );

    console.log("fetchingGoingUsers: ", fetchingGoingUsers);

    let joined = false;
    const goingUsers = moves.find(move => move.id === cardData.id).going;
    console.log("going users: ", goingUsers);
    if (goingUsers) joined = goingUsers.find(_user => _user.uid === user.uid);
    // const joined = goingUsers.find(_user => _user.uid === user.uid);
    const FocusContent = !isGroups ? (
      isActive ? (
        <ActiveFocus
          loading={fetchingGoingUsers}
          handleOnPress={this.handleOnPressJoin}
          joined={joined}
          users={goingUsers}
          open={open}
          userLocation={user.location}
          moveLocation={cardData.location}
        />
      ) : (
        <LaterFocus
          handleOnPress={this.handleOnPressJoin}
          joined={joined}
          open={open}
          userLocation={user.location}
          moveLocation={cardData.location}
        />
      )
    ) : (
      <GroupFocus />
    );

    return (
      <View style={styles.flex}>
        <Animated.View style={[FillAbsolute, opacity]}>
          <BlurView blurType="dark" blurAmount={10} style={FillAbsolute} />
        </Animated.View>

        <Animated.ScrollView
          ref={ScrollView => (this.vertScrollView = ScrollView)}
          onScrollEndDrag={this.handleScrollEndDrag}
          style={focusContainerStyle}
          onScroll={this.vertOnScroll()}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: height + SB_HEIGHT + CARD_GUTTER }}
        >
          {FocusContent}
          <TouchableOpacity
            style={{
              height: "100%",
              width: "100%"
            }}
            onPress={this.handleClose}
          />
        </Animated.ScrollView>

        <Interactable.View
          animatedNativeDriver
          verticalOnly
          ref={Interactable => (this.interactable = Interactable)}
          style={[styles.card, animatedScroll]}
          snapPoints={interactableSnapPoints}
          initialPosition={{ y: pageY }}
          animatedValueY={this.deltaY}
          onDrag={this.handleOnDrag}
          onSnap={this.handleOnSnap}
        >
          <Animated.View style={!transitioning ? gradientContainerStyle : opacity}>
            <LinearGradient
              style={styles.flex}
              locations={[0, 0.5, 1]}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
            />
          </Animated.View>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            ref={ScrollView => (this.horizScrollView = ScrollView)}
            showsHorizontalScrollIndicator={false}
            onScroll={this.horizOnScroll()}
            scrollEventThrottle={16}
            style={styles.scroll}
          >
            <View shouldRasterizeIOS style={styles.cardContainer} onLayout={this.measureCard}>
              {Card}
            </View>
            <Animated.View style={buttonAnimatedStyle}>
              <SuperEllipseMask radius={BORDER_RADIUS}>
                <TouchableScale style={endMoveComputedStyle} onPress={() => console.log("yo")}>
                  <Text style={styles.text}>End Move</Text>
                </TouchableScale>
              </SuperEllipseMask>
            </Animated.View>
          </Animated.ScrollView>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  cardContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: CARD_GUTTER
  },
  card: {
    position: "absolute",
    // backgroundColor: "red",
    top: 0,
    left: 0,
    right: 0
  },
  scroll: {
    width: SCREEN_WIDTH
  },
  endMoveButton: {
    backgroundColor: Colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15
  },
  text: {
    color: "white",
    fontSize: 18
  },
  cover: {
    flex: 1,
    backgroundColor: Colors.lightGray
  }
});

export default Focus;
