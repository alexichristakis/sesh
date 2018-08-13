import { Navigation } from "react-native-navigation";
import { registerScreens, SCREENS } from "./screens";

import { UserAuthenticated } from "./api";

registerScreens();
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    // popGesture: false,
    topBar: {
      visible: false
    }
  });

  /* get user object if authenticated */
  let user = await UserAuthenticated();

  const Register = {
    component: {
      name: SCREENS.REGISTER
    }
  };

  const Home = {
    component: {
      name: SCREENS.HOME,
      passProps: {
        userObj: user
      }
    }
  };

  if (user) {
    Navigation.setRoot({
      root: {
        stack: {
          children: [Register, Home]
        }
      }
    });
  } else {
    Navigation.setRoot({
      root: {
        stack: {
          children: [Register]
        }
      }
    });
  }
});
