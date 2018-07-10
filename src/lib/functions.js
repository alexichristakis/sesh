import { PixelRatio } from "react-native";
import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const FB_GRAPH = "https://graph.facebook.com/";

export const GetThumbnailURL = fbID => {
  const suffix = "/picture?type=small";
  const url = FB_GRAPH + fbID + suffix;
  return url;
};

export const GetPhotoURL = (fbID, size) => {
  size = PixelRatio.getPixelSizeForLayoutSize(size);
  const suffix = `/picture?width=${size}&height=${size}`;
  const url = FB_GRAPH + fbID + suffix;
  return url;
};

export const TransparentModalTo = (componentName, props, options) => {
  ReactNativeHapticFeedback.trigger("impactLight");
  Navigation.showModal({
    component: {
      name: componentName,
      passProps: props,
      options: {
        modalPresentationStyle: "overCurrentContext",
        animations: {
          showModal: {
            enable: false
          },
          dismissModal: {
            enable: false
          }
        },
        ...options
      }
    }
  });
};
