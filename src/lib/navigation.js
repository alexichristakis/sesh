import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SCREENS } from "../screens";

const TransparentModalTo = (componentName, props, options) => {
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
			id: SCREENS.LOADING,
			name: SCREENS.LOADING
		}
	});
};

export const HideLoadingOverlay = () => {
	Navigation.dismissOverlay(SCREENS.LOADING);
};

export const ShowMoveFocus = ({ props }) => {
	ReactNativeHapticFeedback.trigger("impactLight");
	TransparentModalTo(SCREENS.FOCUS, {
		...props,
		isGroups: false
	});
};

export const ShowProfile = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	Navigation.showModal({
		component: {
			name: SCREENS.PROFILE,
			options: {
				modalPresentationStyle: "fullScreen"
			}
		}
	});
};

export const ShowProfileSettings = () => {
	TransparentModalTo(SCREENS.SETTINGS);
};

export const ShowCreateActiveMove = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	TransparentModalTo(SCREENS.CREATE_MOVE, {
		active: true
	});
};

export const ShowCreateLaterMove = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	TransparentModalTo(SCREENS.CREATE_MOVE, {
		active: false
	});
};

export const ShowCreateGroup = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	Navigation.showModal({
		component: {
			name: SCREENS.CREATE_GROUP
		}
	});
};

export const ShowAddFriend = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	Navigation.showModal({
		component: {
			name: SCREENS.ADD_FRIEND
		}
	});
};

/* Groups */
export const ShowGroupFocus = ({ group }) => {
	ReactNativeHapticFeedback.trigger("impactLight");
	TransparentModalTo(SCREENS.FOCUS, {
		isGroups: true,
		cardData: group
	});
};

export const ShowEditGroupName = ({ group }) => {
	ReactNativeHapticFeedback.trigger("impactLight");
	Navigation.showModal({
		component: {
			name: SCREENS.EDIT_GROUP_NAME,
			passProps: { group }
		}
	});
};

export const ShowGroupSettings = ({ group }) => {
	TransparentModalTo(SCREENS.GROUP_SETTINGS, { group });
};

export const ShowAddToGroup = ({ group }) => {
	ReactNativeHapticFeedback.trigger("impactLight");
	Navigation.showModal({
		component: {
			name: SCREENS.ADD_TO_GROUP,
			passProps: { group }
		}
	});
};

export default {
	showLoading: ShowLoadingOverlay,
	hideLoading: HideLoadingOverlay,
	moveFocus: ShowMoveFocus,
	profile: ShowProfile,
	profileSettings: ShowProfileSettings,
	createActiveMove: ShowCreateActiveMove,
	createLaterMove: ShowCreateLaterMove,
	createGroup: ShowCreateGroup,
	addFriend: ShowAddFriend,
	groupFocus: ShowGroupFocus,
	editGroupName: ShowEditGroupName,
	groupSettings: ShowGroupSettings,
	addToGroup: ShowAddToGroup
};

// export const ShowProfileSettings;
