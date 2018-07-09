import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

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
        }
      }
    }
  });
};
