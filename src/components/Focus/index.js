import React, { Component } from "react";
import { Animated, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Interactable from "react-native-interactable";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import LinearGradient from "react-native-linear-gradient";
import { Navigation } from "react-native-navigation";
import { BlurView } from "react-native-blur";

import TouchableScale from "../global/TouchableScale";
import Move from "../global/Move";
import Group from "../Groups/Group";
import MoveFocus from "./MoveFocus";
import GroupFocus from "./GroupFocus";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SB_HEIGHT,
  BORDER_RADIUS,
  CARD_GUTTER
} from "../../lib/constants";
import { Colors, shadow, FillAbsolute } from "../../lib/styles";

class Focus extends Component {
  constructor(props) {
    super(props);
    const { user, cardData, height = 0, width, x, y, pageX, pageY = SCREEN_HEIGHT } = this.props;

    // let joined = false;
    // const goingUsers = moves.find(({ id }) => id === cardData.id).going;
    // const joined = goingUsers.find(({ uid }) => uid === user.uid);

    this.yOffset = new Animated.Value(0);
    this.xOffset = new Animated.Value(0);

    this.deltaY = new Animated.Value(pageY);

    this.state = {
      open: false,
      transitioning: true,
      focusContentHeight: 0,
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
    this.beginTransition();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // const { loading, open, sourceDimension } = this.state;

  //   // // if (loading !== nextState.loading) return true;
  //   // // else if (open !== nextState.open) return true;
  //   // if (sourceDimension.height !== nextState.sourceDimension.height)
  //   //   return true;
  //   // else return false;
  //   return true;
  // }

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

  measureFocusContent = ({ nativeEvent }) => {
    const { height, width, x, y, pageX, pageY } = nativeEvent.layout;
    this.setState({ focusContentHeight: height });
    // console.log(height);
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
    const { onReturn, returnScreen } = this.props;
    if (index === 0) {
      this.setState({ open: false, transitioning: false }, () => {
        if (onReturn) {
          onReturn().then(() => {
            if (returnScreen) returnScreen();
            Navigation.dismissModal(this.props.componentId);
          });
        } else Navigation.dismissModal(this.props.componentId);
      });
    } else if (index === 1) {
      this.setState({ open: true, transitioning: false });
    } else {
      Navigation.dismissModal(this.props.componentId);
    }

    //   if (!isGroups) {
    //     this.props.onReturn().then(() => {
    //       // const moveId = this.props.cardData.id;
    //       // if (this.state.joined && !this.props.joined) this.props.joinMove(moveId);
    //       // else if (!this.state.joined && this.props.joined) this.props.leaveMove(moveId);
    //       this.props.returnScreen();
    //       Navigation.dismissModal(this.props.componentId);
    //     });
    //   } else {
    //     this.setState({ open: false, transitioning: false }, () =>
    //       Navigation.dismissModal(this.props.componentId)
    //     );
    //   }
    // } else {
    //   this.setState({ open: true, transitioning: false });
    // }
  };

  dismissFocus = () => {
    this.interactable.snapTo({ index: 2 });
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
    const { joinMove, leaveMove, cardData, moves, user } = this.props;

    const goingUsers = moves.find(({ id }) => id === cardData.id).going;
    if (goingUsers.find(({ uid }) => uid === user.uid)) leaveMove(cardData.id).then();
    else joinMove(cardData.id).then();
  };

  render() {
    const {
      isGroups,
      isActive,
      cardData,
      groups,
      moves,
      user,
      joinMove,
      leaveMove,
      endMove,
      fetchGoingUsers,
      fetchGroupMembers
    } = this.props;
    const { open, transitioning, focusContentHeight, sourceDimension } = this.state;
    const { height, width, x, y, pageX, pageY } = sourceDimension;

    const openOffset = SB_HEIGHT + CARD_GUTTER;
    const closedOffset = pageY === SCREEN_HEIGHT ? SCREEN_HEIGHT + 500 : SCREEN_HEIGHT;
    const inputRange = openOffset < pageY ? [openOffset, pageY] : [pageY, openOffset];

    const springConfig = { damping: 0.5, tension: 600 };
    const interactableSnapPoints = [
      { y: pageY, ...springConfig }, // closed
      { y: SB_HEIGHT + CARD_GUTTER, ...springConfig }, // open
      { y: SCREEN_HEIGHT, ...springConfig } // dismissed (fully closed)
    ];

    let opacity = {
      opacity: this.deltaY.interpolate({
        inputRange,
        outputRange: openOffset < pageY ? [1, 0] : [0, 1]
      })
    };

    let shadowOpacity = {
      top: height / 2,
      height: height / 2 + 15,
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
      // backgroundColor: "blue",
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

    const FocusContent = isGroups ? (
      <GroupFocus groups={groups} cardData={cardData} fetchGroupMembers={fetchGroupMembers} />
    ) : (
      <MoveFocus
        active={isActive}
        open={open}
        cardData={cardData}
        moves={moves}
        user={user}
        fetchGoingUsers={fetchGoingUsers}
        joinMove={joinMove}
        leaveMove={leaveMove}
        endMove={endMove}
        dismissFocus={this.dismissFocus}
      />
    );

    console.log("rendered focus");
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
          <View onLayout={this.measureFocusContent}>{FocusContent}</View>

          <TouchableOpacity
            style={{
              // backgroundColor: "red",
              // position: "absolute",
              // top: 0,
              // bottom: 0,
              // left: 0,
              // right: 0
              height: SCREEN_HEIGHT - 2 * SB_HEIGHT - height - focusContentHeight
              // width: "100%"
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
          <Animated.View style={!transitioning ? [styles.shadow, shadowOpacity] : opacity}>
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
  shadow: {
    position: "absolute",
    left: 0,
    right: 0
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
