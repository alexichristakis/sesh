import { Navigation } from "react-native-navigation";
import { TransparentModalTo } from "./functions";
import { SCREENS } from "../screens";

export const ShowMoveFocus = ({ props }) => {
	TransparentModalTo(SCREENS.FOCUS, {
		...props,
		isGroups: false
	});
};

export const ShowProfile = () => {
	Navigation.showModal({
		component: {
			name: SCREENS.PROFILE,
			options: {
				modalPresentationStyle: "fullScreen"
			}
		}
	});
};

export const ShowCreateActiveMove = ({ user, groups }) => {
	TransparentModalTo(SCREENS.CREATE_MOVE, {
		active: true,
		groups,
		user
	});
};

export const ShowCreateLaterMove = ({ user, groups }) => {
	TransparentModalTo(SCREENS.CREATE_MOVE, {
		active: false,
		groups,
		user
	});
};

export const ShowCreateGroup = () => {
	Navigation.showModal({
		component: {
			name: SCREENS.CREATE_GROUP
		}
	});
};

export const ShowAddFriend = () => {
	Navigation.showModal({
		component: {
			name: SCREENS.ADD_FRIEND
		}
	});
};

/* Groups */
export const ShowGroupFocus = ({ group }) => {
	TransparentModalTo(SCREENS.FOCUS, {
		isGroups: true,
		cardData: group
	});
};

export const ShowEditGroupName = ({ group }) => {
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
	Navigation.showModal({
		component: {
			name: SCREENS.ADD_TO_GROUP,
			passProps: { group }
		}
	});
};

// export const ShowProfileSettings;
