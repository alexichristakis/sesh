import { Provider } from "react-redux";
import { createStore applyMiddleware} from "redux";
import thunk from 'redux-thunk';


import { Navigation } from "react-native-navigation";

import seshApp from "./redux/reducers";

/* REDUX CONNECTED */
import HomeContainer from "./containers/home";
import ProfileContainer from "./containers/profile";
import AddFriendContainer from "./containers/add-friend";
import CreateGroupContainer from "./containers/create-group";
import AddToGroupContainer from "./containers/add-to-group";
import EditGroupNameContainer from "./containers/edit-group-name";
import CreateMoveContainer from "./containers/create-move";
import FocusContainer from "./containers/focus";

/* REGULAR SCREENS */
import Register from "./components/Authentication/Register";
import SignIn from "./components/Authentication/SignIn";
import LoadingOverlay from "./components/global/LoadingOverlay";
import ProfileSettings from "./components/Profile/Settings";
import GroupSettings from "./components/Groups/Settings";

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

const store = createStore(seshApp, applyMiddleware(thunk));

function registerScreens() {
  /* register containers */
  Navigation.registerComponentWithRedux(HOME, () => HomeContainer, Provider, store);
  Navigation.registerComponentWithRedux(FOCUS, () => FocusContainer, Provider, store);
  Navigation.registerComponentWithRedux(CREATE_MOVE, () => CreateMoveContainer, Provider, store);
  Navigation.registerComponentWithRedux(PROFILE, () => ProfileContainer, Provider, store);
  Navigation.registerComponentWithRedux(ADD_FRIEND, () => AddFriendContainer, Provider, store);
  Navigation.registerComponentWithRedux(CREATE_GROUP, () => CreateGroupContainer, Provider, store);
  Navigation.registerComponentWithRedux(EDIT_GROUP_NAME, () => EditGroupNameContainer, Provider, store);
  Navigation.registerComponentWithRedux(ADD_TO_GROUP, () => AddToGroupContainer, Provider, store);

  /* register components */
  Navigation.registerComponent(REGISTER, () => Register);
  Navigation.registerComponent(SIGN_IN, () => SignIn);
  Navigation.registerComponent(LOADING, () => LoadingOverlay);
  Navigation.registerComponent(SETTINGS, () => ProfileSettings);
  Navigation.registerComponent(GROUP_SETTINGS, () => GroupSettings);
}

module.exports = {
  SCREENS,
  registerScreens
};
