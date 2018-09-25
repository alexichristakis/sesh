import { Navigation } from "react-native-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { SCREENS } from "../screens";

const TransparentModalTo = ({ id, name, props, options }) => {
	Navigation.showModal({
		component: {
			id,
			name,
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
	TransparentModalTo({
		id: SCREENS.ID.MOVE_FOCUS,
		name: SCREENS.FOCUS,
		props: {
			...props,
			isGroups: false
		}
	});
};

export const DismissMoveFocus = () => {
	Navigation.dismissModal(SCREENS.ID.MOVE_FOCUS);
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
	TransparentModalTo({ name: SCREENS.SETTINGS });
};

export const ShowCreateActiveMove = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	TransparentModalTo({
		name: SCREENS.CREATE_MOVE,
		props: {
			active: true
		}
	});
};

export const ShowCreateLaterMove = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	TransparentModalTo({
		name: SCREENS.CREATE_MOVE,
		props: {
			active: false
		}
	});
};

export const ShowCreateGroup = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	// Navigation.showModal({
	// 	component: {
	// 		name: SCREENS.CREATE_GROUP
	// 	}
	// });
	TransparentModalTo({
		name: SCREENS.CREATE_GROUP
	});
};

export const ShowAddFriend = () => {
	ReactNativeHapticFeedback.trigger("impactLight");
	// Navigation.showModal({
	// 	component: {
	// 		name: SCREENS.ADD_FRIEND
	// 	}
	// });
	TransparentModalTo({
		name: SCREENS.ADD_FRIEND
	});
};

/* Groups */
export const ShowGroupFocus = ({ props }) => {
	ReactNativeHapticFeedback.trigger("impactLight");
	TransparentModalTo({
		name: SCREENS.FOCUS,
		props: {
			...props,
			isGroups: true
		}
	});
};

export const ShowEditGroupName = ({ group }) => {
	ReactNativeHapticFeedback.trigger("impactLight");
	// Navigation.showModal({
	// 	component: {
	// 		name: SCREENS.EDIT_GROUP_NAME,
	// 		passProps: { group }
	// 	}
	// });
	TransparentModalTo({ name: SCREENS.EDIT_GROUP_NAME, props: { group } });
};

export const ShowGroupSettings = ({ group }) => {
	TransparentModalTo({ name: SCREENS.GROUP_SETTINGS, props: { group } });
};

export const ShowAddToGroup = ({ group }) => {
	ReactNativeHapticFeedback.trigger("impactLight");
	TransparentModalTo({ name: SCREENS.ADD_TO_GROUP, props: { group } });
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
