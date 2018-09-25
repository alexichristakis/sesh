import React, { Component } from "react";
import { StyleSheet, Animated, Keyboard, View, Text } from "react-native";

import { Navigation } from "react-native-navigation";
import Interactable from "react-native-interactable";
import { BlurView } from "react-native-blur";
import LinearGradient from "react-native-linear-gradient";

import SearchCard from "./SearchCard";
import Results from "./Results";

import { SearchForUser } from "../../api";
import { SB_HEIGHT, IS_X, SCREEN_HEIGHT, CARD_GUTTER } from "../../lib/constants";
import { Colors, FillAbsolute, TextStyles } from "../../lib/styles";
import query from "../../lib/query";

const yOffset = new Animated.Value(0);

class AddToGroup extends Component {
  constructor(props) {
    super(props);

    this.deltaY = new Animated.Value(SCREEN_HEIGHT);

    this.state = {
      open: false,
      results: props.friends.friends,
      selectedUsers: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.interactable.snapTo({ index: 1 });
    }, 5);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // if (this.state.open !== nextState.open) return true;
  //   // else if (this.state.chosenDate !== nextState.chosenDate) return true;
  //   // else if (this.state.selectedIndex !== nextState.selectedIndex) return true;
  //   // else if (this.state.buttonVisible !== nextState.buttonVisible) return true;
  //   // else return false;
  //   return true;
  // }

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
    } else {
      this.setState({ open: true }, this.checkButtonOpen);
    }
  };

  handleOnDrag = event => {
    const { y } = event.nativeEvent;
    this.setState({ buttonVisible: false });
    Keyboard.dismiss();
    this.scroll.getNode().scrollTo({ x: 0, y: 0, animated: true });
  };

  handleScrollRelease = event => {
    const { changedTouches, locationY, pageY } = event.nativeEvent;
    if (this.yOffset._value < -75) {
      this.setState({ buttonVisible: false }, () => {
        Keyboard.dismiss();
        Navigation.dismissModal(this.props.componentId);
      });
    }
  };

  handleOnPressDismiss = () => {
    this.setState({ open: false, buttonVisible: false }, () => {
      Keyboard.dismiss();
      this.scroll.getNode().scrollTo({ x: 0, y: 0, animated: true });
      this.interactable.snapTo({ index: 0 });
    });
  };

  search = searched => {
    this.setState({ searched }, () => {
      const { friends } = this.props;
      var res = query("name")
        .startsWith(searched)
        .on(friends.friends);
      this.setState({ results: res });
    });
  };

  handleOnPressAddToGroup = user => {
    const { addToGroup, group } = this.props;
    addToGroup(user, group.id);
  };

  render() {
    const { friends } = this.props;
    const { buttonVisible } = this.state;

    const springConfig = { damping: 0.5, tension: 600 };
    const closed = { y: SCREEN_HEIGHT, ...springConfig };
    const open = { y: SB_HEIGHT, ...springConfig };

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

    let results = (
      <Results
        addToGroup={this.handleOnPressAddToGroup}
        data={this.state.results}
        // onSelect={users => this.setState({ selectedUsers: users }, this.checkButtonOpen)}
      />
    );

    return (
      <View style={styles.container}>
        <Animated.View style={[FillAbsolute, opacity]}>
          <BlurView blurType="dark" style={styles.flex} />
        </Animated.View>
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
          <Text style={TextStyles.headerWhite}>ADD FRIENDS</Text>
          {this.state.loading && results}
          {!this.state.loading && results}
        </Animated.ScrollView>
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
          <Animated.View style={[styles.shadowContainer, shadowOpacity]}>
            <LinearGradient
              style={styles.flex}
              locations={[0.25, 0.5, 1]}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
            />
          </Animated.View>
          <SearchCard onPressDismiss={this.handleOnPressDismiss} onChangeText={this.search} />
        </Interactable.View>
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

export default AddToGroup;
