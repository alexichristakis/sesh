import { PixelRatio } from "react-native";
import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { LOADING } from "./constants";

const FB_GRAPH = "https://graph.facebook.com/";

export const GenerateMarkers = moves => {
  const currentTime = new Date().getTime();

  let markers = [];
  moves.forEach(move => {
    const { time, location, id, group, description } = move;
    const active = time - currentTime < 0;
    markers.push({
      coords: location,
      key: id,
      active: active,
      group: group,
      description: description
    });
  });

  return markers;
};

export const GenerateInitialRegion = (markers, userLocation) => {
  const userLatitude = userLocation.latitude;
  const userLongitude = userLocation.longitude;

  let region;
  if (markers.length === 0) {
    region = {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.0044,
      longitudeDelta: 0.0044
    };
  } else {
    let maxLatitude = userLatitude;
    let minLatitude = userLatitude;
    let maxLongitude = userLongitude;
    let minLongitude = userLongitude;

    markers.forEach(marker => {
      const { latitude, longitude } = marker.coords;
      maxLatitude = Math.max(latitude, maxLatitude);
      minLatitude = Math.min(latitude, minLatitude);
      maxLongitude = Math.max(longitude, maxLongitude);
      minLongitude = Math.min(longitude, minLongitude);
    });

    const latitude = (maxLatitude + minLatitude) / 2;
    const longitude = (maxLongitude + minLongitude) / 2;
    const delta = Math.max(
      Math.abs(maxLatitude - minLatitude),
      Math.abs(maxLongitude - minLongitude)
    );

    region = {
      latitude,
      longitude,
      latitudeDelta: delta,
      longitudeDelta: delta
    };
  }

  return region;
};

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

export const ShowLoadingOverlay = () => {
  Navigation.showOverlay({
    component: {
      id: LOADING,
      name: "sesh.Loading"
    }
  });
};
