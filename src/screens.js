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
import CreateActiveMove from "./components/CreateMoves/CreateActiveMove";
import CreateLaterMove from "./components/CreateMoves/CreateLaterMove";

import Settings from "./components/Groups/Settings";
// import Friends from "./components/Friends";
// import Feed from "./components/Feed";

// import Focus from "./components/"

import Transition from "./components/global/Transition";

import ActiveFocus from "./components/Active/ActiveFocus";
import LaterFocus from "./components/Later/LaterFocus";
import GroupFocus from "./components/Groups/GroupFocus";

// import Transition from "./components/Active";

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
  Navigation.registerComponent("sesh.Transition", () => Transition);
  Navigation.registerComponent("sesh.Profile", () => Profile);
  Navigation.registerComponent("sesh.AddFriend", () => AddFriend);

  Navigation.registerComponent("sesh.Groups", () => Groups);
  Navigation.registerComponent("sesh.CreateGroup", () => CreateGroup);
  Navigation.registerComponent("sesh.AddToGroup", () => AddToGroup);
  Navigation.registerComponent("sesh.Settings", () => Settings);

  Navigation.registerComponent("sesh.CreateActiveMove", () => CreateActiveMove);
  Navigation.registerComponent("sesh.CreateLaterMove", () => CreateLaterMove);

  Navigation.registerComponent("sesh.ActiveFocus", () => ActiveFocus);
  Navigation.registerComponent("sesh.LaterFocus", () => LaterFocus);
  Navigation.registerComponent("sesh.GroupFocus", () => GroupFocus);
}

module.exports = {
  registerScreens
};
