import React from "react";
import { StyleSheet, Animated, Image, View } from "react-native";
import { BlurView } from "react-native-blur";

import { FillAbsolute } from "~/lib/styles";

const ProgressiveImage = ({ thumbnail, source, style = {} }) => {
  const thumbnailOpacity = new Animated.Value(0);
  const blurOpacity = new Animated.Value(1);

  onMainLoad = () => {
    Animated.timing(blurOpacity, {
      toValue: 0,
      duration: 250
    }).start();
  };

  onThumbnailLoad = () => {
    Animated.timing(thumbnailOpacity, {
      toValue: 1,
      duration: 50
    }).start();
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="cover" style={style} source={{ uri: source }} onLoad={onMainLoad} />
      <Animated.View style={[FillAbsolute, { opacity: blurOpacity }]}>
        <Animated.Image
          resizeMode="cover"
          style={[{ opacity: thumbnailOpacity }, style]}
          source={{ uri: thumbnail }}
          onLoad={onThumbnailLoad}
        />
        <BlurView blurType="dark" style={FillAbsolute} blurAmount={8} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  }
});

export default ProgressiveImage;
