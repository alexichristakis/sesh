import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { Navigation } from "react-native-navigation";
import { VibrancyView, BlurView } from "react-native-blur";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Icon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import moment from "moment";

import TouchableScale from "../global/TouchableScale";
import ProgressiveImage from "../global/ProgressiveImage";

import { DownloadPhoto } from "../../api";
import {
  TransparentModalTo,
  FormatDistanceAway,
  GetPhotoURL,
  GetThumbnailURL
} from "../../lib/functions";
import { Colors, shadow } from "../../lib/styles";
import { SCREEN_WIDTH, CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";

const ICON_SIZE = Math.round((SCREEN_WIDTH - 2 * CARD_GUTTER) / 3);

class Move extends Component {
  constructor(props) {
    super(props);

    this.animatedOpacity = new Animated.Value(0);
    this.state = {
      loading: true,
      photo: { uri: "" },
      height: 0,
      width: 0,
      pageX: 0,
      pageY: 0,
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    const { user_fb_id } = this.props.move;
    DownloadPhoto(user_fb_id, GetPhotoURL(user_fb_id, ICON_SIZE, ICON_SIZE)).then(photo =>
      this.setState({ photo, loading: false })
    );

    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: 150 * this.props.index,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    }).start();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.loading !== nextState.loading) return true;
    else return false;
  }

  onLeave = () => {
    Animated.timing(this.animatedOpacity, {
      toValue: 0,
      delay: 50,
      duration: 25,
      useNativeDriver: true
    }).start();
  };

  onReturn = () => {
    return new Promise(resolve => {
      Animated.timing(this.animatedOpacity, {
        toValue: 1,
        duration: 5,
        useNativeDriver: true
      }).start(() => resolve(true));
    });
  };

  handleOnPress = () => {
    this.onLeave();
    this.view.measure((x, y, width, height, pageX, pageY) => {
      this.setState({ pageX: pageX, pageY: pageY }, () => {
        const { height, width, x, y, photo } = this.state;
        const dimensions = { height, width, x, y, pageX, pageY };
        this.props.transitionFrom(dimensions, this.onReturn, {
          ...this.props.move,
          photo: photo.uri !== "" ? photo : null
        });
      });
    });
  };

  measureCard = event => {
    const { height, width, x, y } = event.nativeEvent.layout;
    this.setState({ height, width, x, y });
  };

  handleGroupOnPress = () => {
    TransparentModalTo("sesh.Focus", {
      groups: true,
      data: { name: this.props.move.group, size: 12 }
    });
  };

  render() {
    const { focused, active, move, coords } = this.props;
    const { group, name, description, location, time, user_fb_id } = move;
    const { loading, photo } = this.state;

    let opacity = {
      opacity: this.animatedOpacity
    };

    let Content = (
      <SuperEllipseMask style={styles.mask} radius={BORDER_RADIUS}>
        {move.photo ? (
          <Image resizeMode="cover" style={styles.image} source={move.photo} />
        ) : (
          <ProgressiveImage
            style={styles.image}
            loading={loading}
            source={photo}
            thumbnail={{ uri: GetThumbnailURL(user_fb_id) }}
          />
        )}
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.groupButton} onPress={this.handleGroupOnPress}>
            <Text allowFontScaling={false} style={styles.group}>
              {name}
            </Text>
            <Icon
              style={{ paddingTop: 3 }}
              name={"chevron-right"}
              size={14}
              color={active ? Colors.active : Colors.later}
            />
            <Text allowFontScaling={false} style={styles.group}>
              {group}
            </Text>
          </TouchableOpacity>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.bottom}>
            <Text style={styles.location}>
              <Icon name={"compass"} size={12} color={Colors.gray} />
              {" " + FormatDistanceAway(location, coords)}
            </Text>
            <Text style={styles.time}>{moment(time).fromNow()}</Text>
          </View>
        </View>
      </SuperEllipseMask>
    );

    if (focused) return Content;
    else
      return (
        <View ref={view => (this.view = view)} style={styles.container} onLayout={this.measureCard}>
          <TouchableScale animatedStyle={opacity} onPress={this.handleOnPress}>
            {Content}
          </TouchableScale>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: CARD_GUTTER,
    marginBottom: CARD_GUTTER
  },
  mask: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white"
  },
  top: {
    flex: 2,
    flexDirection: "row"
  },
  groupButton: {
    flexDirection: "row",
    paddingBottom: 5
  },
  image: {
    // flex: 1,
    alignSelf: "center",
    backgroundColor: Colors.gray,
    // borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    width: ICON_SIZE
    // margin: 10
  },
  contentContainer: {
    flex: 2,
    padding: 10
  },
  header: {
    flex: 2,
    alignSelf: "center"
  },
  vibrancy: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
    borderRadius: 12.5
  },
  name: {
    fontSize: 14,
    color: Colors.gray
  },
  group: {
    fontSize: 16,
    fontWeight: "500"
  },
  time: {
    textAlign: "right",
    fontSize: 14,
    color: Colors.gray
    // color: Colors.gray
  },
  description: {
    flex: 1,
    fontSize: 14
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  location: {
    fontSize: 14,
    textAlignVertical: "center",
    color: Colors.gray
  }
});

export default Move;
