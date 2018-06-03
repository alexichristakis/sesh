import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";

import { BlurView, VibrancyView } from "react-native-blur";
import RNFS from "react-native-fs";
import Icon from "react-native-vector-icons/Feather";

import { TimeAgo } from "../../lib/functions";
import { Colors, shadow, cardShadow } from "../../lib/styles";

const ICON_SIZE1 = 35;
const ICON_SIZE2 = 30;

class Group extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: RNFS.DocumentDirectoryPath + "/profile_pic.png",
      editing: false,
      loading: true,
      groupName: this.props.data.name,
      newName: ""
    };
  }

  componentDidMount() {
    // const path = RNFS.DocumentDirectoryPath + "/profile_pic.png";
    // RNFS.readFile(path, "base64").then(res => {
    // 	this.setState({ photo: "data:image/png;base64," + res, loading: false });
    // });
  }

  onChangeText = text => {
    this.setState({ newName: text });
  };

  onFocus = () => {
    this.setState({ editing: true });
  };

  onEndEditing = () => {
    this.setState({ editing: false });
    const currentName = this.state.groupName;
    const newName = this.state.newName;
    if (newName.length > 0 && newName !== currentName) {
      this.setState({ groupName: newName, newName: "" });
      this.props.updateName(this.props.data.id, newName);
    }
  };

  render() {
    const group = this.props.data;

    return (
      <View style={styles.container}>
        <View style={styles.pictures}>
          <Image style={styles.image1} source={{ uri: this.state.photo }} />
          <Image style={styles.image2} source={{ uri: this.state.photo }} />
          <Image style={styles.image3} source={{ uri: this.state.photo }} />
        </View>
        <View style={styles.mid}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!this.props.editName && (
              <Text style={styles.name}>{group.name}</Text>
            )}
            {this.props.editName && (
              <TextInput
                ref={item => (this.input = item)}
                style={styles.name}
                onFocus={this.onFocus}
                onEndEditing={this.onEndEditing}
                onChangeText={text => this.onChangeText(text)}
                placeholder={this.state.groupName}
                placeholderTextColor={
                  this.state.editing ? Colors.mediumGray : "black"
                }
              />
            )}
            {this.props.editName && (
              <Icon
                style={{ paddingLeft: 5 }}
                name={"edit-2"}
                size={12}
                color={Colors.groups}
              />
            )}
          </View>
          <Text style={styles.size}>{group.size} members</Text>
        </View>

        <Text style={styles.time}>{TimeAgo(group.time)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    // padding: 20,
    borderWidth: 20,
    borderColor: Colors.lightGray
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    // backgroundColor: "transparent",
    // backgroundColor: "white",
    // marginHorizontal: 10,
    // borderWidth: 20,
    // borderColor: Colors.primary,
    overflow: "hidden",
    borderRadius: 15,
    padding: 10,
    paddingRight: 12
    // ...shadow
  },
  blur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  blank: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white"
  },
  pictures: {
    flexDirection: "row",
    flex: 1.5
  },
  image1: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.gray,
    borderRadius: ICON_SIZE2 / 2,
    height: ICON_SIZE2,
    width: ICON_SIZE2
  },
  image2: {
    position: "absolute",
    marginLeft: ICON_SIZE2,
    alignSelf: "center",
    backgroundColor: Colors.gray,
    borderRadius: ICON_SIZE2 / 2,
    height: ICON_SIZE2,
    width: ICON_SIZE2
  },
  image3: {
    position: "absolute",
    marginLeft: ICON_SIZE2 / 2,
    alignSelf: "center",
    backgroundColor: Colors.gray,
    borderRadius: ICON_SIZE1 / 2,
    height: ICON_SIZE1,
    width: ICON_SIZE1
  },
  mid: {
    flex: 5,
    marginLeft: 10
  },
  name: {
    fontSize: 24,
    fontWeight: "900"
    // color: "white"
  },
  size: {
    fontSize: 14,
    fontWeight: "300",
    color: Colors.gray
  },
  time: {
    fontSize: 14,
    fontWeight: "900",
    color: Colors.groups
  }
});

export default Group;
