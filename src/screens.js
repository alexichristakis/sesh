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

const REGISTER = "register";
const SIGN_IN = "sign_in";
const HOME = "home";
const FOCUS = "focus";
const CREATE_MOVE = "create_move";
const PROFILE = "profile";
const LOADING = "loading";
const ADD_FRIEND = "add_friend";
const SETTINGS = "settings";
const CREATE_GROUP = "create_group";
const EDIT_GROUP_NAME = "edit_group_name";
const ADD_TO_GROUP = "add_to_group";
const GROUP_SETTINGS = "group_settings";

const SCREENS = {
  REGISTER,
  SIGN_IN,
  HOME,
  FOCUS,
  CREATE_MOVE,
  PROFILE,
  LOADING,
  ADD_FRIEND,
  SETTINGS,
  CREATE_GROUP,
  EDIT_GROUP_NAME,
  ADD_TO_GROUP,
  GROUP_SETTINGS
};

function registerScreens() {
  /* authentication */
  Navigation.registerComponent(REGISTER, () => Register);
  Navigation.registerComponent(SIGN_IN, () => SignIn);

  /* global screens */
  Navigation.registerComponent(HOME, () => Home);
  Navigation.registerComponent(FOCUS, () => Focus);
  Navigation.registerComponent(CREATE_MOVE, () => CreateMove);
  Navigation.registerComponent(PROFILE, () => Profile);
  Navigation.registerComponent(LOADING, () => LoadingOverlay);

  /* profile screens */
  Navigation.registerComponent(ADD_FRIEND, () => AddFriend);
  Navigation.registerComponent(SETTINGS, () => ProfileSettings);

  /* group screens */
  Navigation.registerComponent(CREATE_GROUP, () => CreateGroup);
  Navigation.registerComponent(EDIT_GROUP_NAME, () => EditName);
  Navigation.registerComponent(ADD_TO_GROUP, () => AddToGroup);
  Navigation.registerComponent(GROUP_SETTINGS, () => GroupSettings);
}

module.exports = {
  SCREENS,
  registerScreens
};
