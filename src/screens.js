import { Navigation } from "react-native-navigation";

// authentication
import Register from "./components/Authentication/Register";
import SignIn from "./components/Authentication/SignIn";

// onboarding

// main
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddFriend from "./components/AddFriend";
import Groups from "./components/Groups";
import CreateGroup from "./components/Groups/CreateGroup";
import AddToGroup from "./components/Groups/AddToGroup";
import CreateMove from "./components/CreateMove";

import Settings from "./components/Groups/Settings";
import Focus from "./components/global/Focus";

import EditName from "./components/Groups/EditName";
import AddMember from "./components/Groups/AddMember";

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
  Navigation.registerComponent("sesh.Register", () => Register);
  Navigation.registerComponent("sesh.SignIn", () => SignIn);

  Navigation.registerComponent("sesh.Home", () => Home);
  Navigation.registerComponent("sesh.Focus", () => Focus);
  Navigation.registerComponent("sesh.Profile", () => Profile);
  Navigation.registerComponent("sesh.AddFriend", () => AddFriend);

  Navigation.registerComponent("sesh.Groups", () => Groups);
  Navigation.registerComponent("sesh.CreateGroup", () => CreateGroup);
  Navigation.registerComponent("sesh.AddToGroup", () => AddToGroup);
  Navigation.registerComponent("sesh.Settings", () => Settings);

  Navigation.registerComponent("sesh.CreateMove", () => CreateMove);

  Navigation.registerComponent("sesh.EditName", () => EditName);
  Navigation.registerComponent("sesh.AddMember", () => AddMember);
}

module.exports = {
  registerScreens
};
