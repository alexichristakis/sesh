import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, FlatList, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

import ActiveMove from "./ActiveMove";
import VerticalList from "../global/VerticalList";
import CardWrapper from "../global/CardWrapper";
import Transition from "../global/Transition";

const data = [
  {
    id: "alexi1",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description:
      "suite dinner in pierson! bring anyone. dinner is really good tonight--Janvi's favorite chicken!!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
  },
  {
    id: "alexi2",
    name: "Everest Fang",
    group: "Fence Club",
    time: 1526599742850,
    description: "just a chill sesh",
    // location: "380 Crown – 0.76mi",
    location: "0.76mi",

    photo: "https://graph.facebook.com/100004662791911/picture?type=large"
  },
  {
    id: "alexi3",
    name: "Alexi Christakis",
    group: "Splash Bros",
    time: 1526598742850,
    description: "splish splash 11 pac",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
  },
  {
    id: "alexi4",
    name: "William Oles",
    group: "Pierson Fam",
    time: 1526598742850,
    description: "lunch anyone?",
    // location: "Morse College – 0.44mi",
    location: "0.44mi",

    photo: "https://graph.facebook.com/100000731179223/picture?type=large"
  },
  {
    id: "alexi5",
    name: "Max Golden",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1182281483/picture?type=large"
  },
  {
    id: "alexi6",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
  },
  {
    id: "alexi7",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
  },
  {
    id: "alexi8",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description:
      "suite dinner in pierson! bring anyone. dinner is really good tonight--Janvi's favorite chicken!!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
  },
  {
    id: "alexi9",
    name: "Everest Fang",
    group: "Fence Club",
    time: 1526599742850,
    description: "just a chill sesh",
    // location: "380 Crown – 0.76mi",
    location: "0.76mi",

    photo: "https://graph.facebook.com/100004662791911/picture?type=large"
  },
  {
    id: "alexi10",
    name: "Alexi Christakis",
    group: "Splash Bros",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
  },
  {
    id: "alexi11",
    name: "William Oles",
    group: "Pierson Fam",
    time: 1526598742850,
    description: "lunch anyone?",
    // location: "Morse College – 0.44mi",
    location: "0.44mi",

    photo: "https://graph.facebook.com/100000731179223/picture?type=large"
  },
  {
    id: "alexi12",
    name: "Max Golden",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1182281483/picture?type=large"
  },
  {
    id: "alexi13",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
  },
  {
    id: "alexi14",
    name: "Alexi Christakis",
    group: "9pack",
    time: 1526598742850,
    description: "suite dinner in pierson!",
    // location: "Pierson College – 0.24mi",
    location: "0.24mi",

    photo: "https://graph.facebook.com/1779355238751386/picture?type=large"
  }
];

class Active extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinedMoves: [],
      MoveComponent: null
    };
  }

  transitionFrom = (source, onReturn, data, MoveComponent) => {
    let joined = this.state.joinedMoves.includes(data.id);
    // this.setState({ MoveComponent: MoveComponent });
    // this.
    // this.transition.openCard(source, onReturn, data, {
    //   joined: joined,
    //   joinMove: this.joinMove,
    //   leaveMove: this.leaveMove,
    //   onPressPresentOverlayTo: this.props.onPressPresentOverlayTo
    // });

    this.props.clearScreen();
    this.list.fadeOut();
    this.transition.beginTransition(MoveComponent, source, onReturn, data, {
      joined: joined,
      joinMove: this.joinMove,
      leaveMove: this.leaveMove,
      onPressPresentOverlayTo: this.props.onPressPresentOverlayTo
    });
  };

  transitionFinished = (source, sharedData) => {
    // this.setState({ source: {}, sharedData: {}, onReturn: null, MoveComponent: null });
  };

  _renderItem = ({ item, index }) => (
    <CardWrapper data={item} transitionFrom={this.transitionFrom}>
      <ActiveMove move={item} />
    </CardWrapper>
  );

  joinMove = move => {
    if (!this.state.joinedMoves.includes(move)) {
      this.setState({ joinedMoves: [...this.state.joinedMoves, move] });
      // make api call
    }
  };

  leaveMove = move => {
    if (this.state.joinedMoves.includes(move)) {
      let index = this.state.joinedMoves.indexOf(move);
      this.setState({
        joinedMoves: [
          ...this.state.joinedMoves.slice(0, index),
          ...this.state.joinedMoves.slice(index + 1)
        ]
      });
      // make api call
    }
  };

  render() {
    const { openProgress } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <VerticalList
          ref={item => (this.list = item)}
          data={data}
          renderItem={this._renderItem}
          onScroll={this.props._vertOnScroll}
          onScrollBeginDrag={this.props._onScrollBegin}
          onScrollEndDrag={this.props._onScrollEnd}
        />
        <Transition
          ref={item => (this.transition = item)}
          destinationPage={"sesh.ActiveFocus"}
          transitionFinished={this.transitionFinished}
          // clearScreen={this.props.clearScreen}
          returnScreen={this.props.returnScreen}
          onPressPushTo={this.props.onPressPushTo}
          MoveComponent={this.state.MoveComponent}
        />
      </View>
    );
  }
}

export default Active;
