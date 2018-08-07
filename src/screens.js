import { Navigation } from "react-native-navigation";

// authentication
import Register from "./components/Authentication/Register";
import SignIn from "./components/Authentication/SignIn";

// onboarding

// main
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddFriend from "./components/Profile/AddFriend";
import ProfileSettings from "./components/Profile/Settings";
import LoadingOverlay from "./components/global/LoadingOverlay";

import Groups from "./components/Groups";
import CreateGroup from "./components/Groups/CreateGroup";
import AddToGroup from "./components/Groups/AddToGroup";
import CreateMove from "./components/CreateMove";

import GroupSettings from "./components/Groups/Settings";
import Focus from "./components/Focus";

import EditName from "./components/Groups/EditName";

function sceneCreator(sceneComp, store) {
  return () => {
    class SceneWrapper extends React.Component {
      render() {
        return <Provider store={store}>{React.createElement(sceneComp)}</Provider>;
      }
    }
  };
}

function registerScreens() {
  /* authentication */
  Navigation.registerComponent("sesh.Register", () => Register);
  Navigation.registerComponent("sesh.SignIn", () => SignIn);

  /* global screens */
  Navigation.registerComponent("sesh.Home", () => Home);
  Navigation.registerComponent("sesh.Focus", () => Focus);
  Navigation.registerComponent("sesh.CreateMove", () => CreateMove);
  Navigation.registerComponent("sesh.Profile", () => Profile);
  Navigation.registerComponent("sesh.Loading", () => LoadingOverlay);

  /* profile screens */
  Navigation.registerComponent("profile.AddFriend", () => AddFriend);
  Navigation.registerComponent("profile.Settings", () => ProfileSettings);

  /* group screens */
  Navigation.registerComponent("groups.CreateGroup", () => CreateGroup);
  Navigation.registerComponent("groups.EditName", () => EditName);
  Navigation.registerComponent("groups.AddToGroup", () => AddToGroup);
  Navigation.registerComponent("groups.Settings", () => GroupSettings);
}

module.exports = {
  registerScreens
};
