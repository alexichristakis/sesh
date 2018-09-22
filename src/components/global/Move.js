import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";
import Icon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import moment from "moment";

import TouchableScale from "../global/TouchableScale";
import ProgressiveImage from "../global/ProgressiveImage";

import { DownloadPhoto } from "../../api";
import { FormatDistanceAway, GetPhotoURL, GetThumbnailURL } from "../../lib/functions";
import { ShowGroupFocus } from "../../lib/navigation";
import { Colors, TextStyles, shadow } from "../../lib/styles";
import { SCREEN_WIDTH, CARD_GUTTER, BORDER_RADIUS } from "../../lib/constants";

const ICON_SIZE = Math.round((SCREEN_WIDTH - 2 * CARD_GUTTER) / 3);

class Move extends Component {
  constructor(props) {
    super(props);

    this.animatedOpacity = new Animated.Value(0);
    this.state = {
      loading: true,
      photo: { uri: "" },
      pageX: 0,
      pageY: 0
    };
  }

  componentDidMount() {
    const { fb_id } = this.props.move;
    DownloadPhoto(fb_id, GetPhotoURL(fb_id, ICON_SIZE, ICON_SIZE)).then(photo =>
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
      delay: 45,
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
      this.setState({ pageX, pageY }, () => {
        const { height, width, x, y, photo } = this.state;
        const dimensions = { height, width, x, y, pageX, pageY };
        this.props.transition(dimensions, this.onReturn, {
          ...this.props.move,
          photo: photo.uri !== "" ? photo : null
        });
      });
    });
  };

  handleGroupOnPress = () => {
    const { group_name, group_id } = this.props.move;
    const props = { cardData: { id: group_id, name: group_name } };
    ShowGroupFocus({ props });
  };

  render() {
    const { focused, active, move, userLocation } = this.props;
    const { group_name, sender_name, description, location, time, fb_id } = move;
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
            thumbnail={{ uri: GetThumbnailURL(fb_id) }}
          />
        )}
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.groupButton} onPress={this.handleGroupOnPress}>
            <Text allowFontScaling={false} style={TextStyles.bold}>
              {sender_name.split(" ")[0]}
            </Text>
            <Icon
              style={{ paddingTop: 3 }}
              name={"chevron-right"}
              size={14}
              color={active ? Colors.active : Colors.later}
            />
            <Text allowFontScaling={false} style={TextStyles.bold}>
              {group_name}
            </Text>
          </TouchableOpacity>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.bottom}>
            <Text style={styles.location}>
              <Icon name={"compass"} size={12} color={Colors.gray} />
              {" " + FormatDistanceAway(location, userLocation)}
            </Text>
            <Text style={styles.time}>{moment(time).fromNow()}</Text>
          </View>
        </View>
      </SuperEllipseMask>
    );

    if (focused) return Content;
    else
      return (
        <View ref={view => (this.view = view)} style={styles.container}>
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
    // marginBottom: CARD_GUTTER
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
    ...TextStyles.gray,
    textAlign: "right"
  },
  description: {
    ...TextStyles.body,
    flex: 1
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  location: {
    ...TextStyles.gray,
    textAlignVertical: "center"
  }
});

export default Move;
