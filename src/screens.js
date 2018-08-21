import { Navigation } from "react-native-navigation";

/* REDUX CONNECTED */
import HomeContainer from "./containers/home";
import ProfileContainer from "./containers/profile";
import AddFriendContainer from "./containers/add-friend";
import CreateGroupContainer from "./containers/create-group";
import AddToGroupContainer from "./containers/add-to-group";
import EditGroupNameContainer from "./containers/edit-group-name";
import CreateMoveContainer from "./containers/create-move";
import FocusContainer from "./containers/focus";
import GroupSettingsContainer from "./containers/group-settings";

/* REGULAR SCREENS */
import Register from "./components/Authentication/Register";
import SignIn from "./components/Authentication/SignIn";
import PhoneAuth from "./components/Authentication/PhoneAuth";
import LoadingOverlay from "./components/global/LoadingOverlay";
import ProfileSettings from "./components/Profile/Settings";

const REGISTER = "register";
const PHONE_AUTH = "phone_auth"
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

export function registerScreens(Provider, store) {
  /* register containers */
  Navigation.registerComponentWithRedux(HOME, () => HomeContainer, Provider, store);
  Navigation.registerComponentWithRedux(FOCUS, () => FocusContainer, Provider, store);
  Navigation.registerComponentWithRedux(CREATE_MOVE, () => CreateMoveContainer, Provider, store);
  Navigation.registerComponentWithRedux(PROFILE, () => ProfileContainer, Provider, store);
  Navigation.registerComponentWithRedux(ADD_FRIEND, () => AddFriendContainer, Provider, store);
  Navigation.registerComponentWithRedux(CREATE_GROUP, () => CreateGroupContainer, Provider, store);
  Navigation.registerComponentWithRedux(EDIT_GROUP_NAME, () => EditGroupNameContainer, Provider, store);
  Navigation.registerComponentWithRedux(ADD_TO_GROUP, () => AddToGroupContainer, Provider, store);
  Navigation.registerComponentWithRedux(GROUP_SETTINGS, () => GroupSettingsContainer, Provider, store);

  /* register components */
  Navigation.registerComponent(REGISTER, () => Register);
  Navigation.registerComponent(PHONE_AUTH, () => PhoneAuth);
  Navigation.registerComponent(SIGN_IN, () => SignIn);
  Navigation.registerComponent(LOADING, () => LoadingOverlay);
  Navigation.registerComponent(SETTINGS, () => ProfileSettings);
}

export const SCREENS = {
  REGISTER,
  PHONE_AUTH,
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
  GROUP_SETTINGS,
  ID: {
    MOVE_FOCUS: 'move_focus',
    GROUP_FOCUS: 'group_focus'
  }
};
