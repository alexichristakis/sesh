import { Navigation } from "react-native-navigation";
import { registerScreens } from "./screens";

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
      name: "sesh.Register"
    }
  };

  const Home = {
    component: {
      name: "sesh.Home",
      passProps: {
        user: user._user
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
