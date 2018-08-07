import React from "react";
import { StyleSheet, Animated, Image, View } from "react-native";
import { BlurView } from "react-native-blur";

import { FillAbsolute } from "../../lib/styles";

const ProgressiveImage = ({ thumbnail, source, loading = false, style = {} }) => {
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
    <View style={style}>
      {!loading && <Image resizeMode="cover" style={style} source={source} onLoad={onMainLoad} />}
      <Animated.View style={[FillAbsolute, { opacity: blurOpacity }]}>
        <Animated.Image
          resizeMode="cover"
          style={[{ opacity: thumbnailOpacity }, style]}
          source={thumbnail}
          onLoad={onThumbnailLoad}
        />
        <BlurView blurType="dark" style={FillAbsolute} blurAmount={8} />
      </Animated.View>
    </View>
  );
};

export default ProgressiveImage;
