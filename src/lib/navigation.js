import { Navigation } from "react-native-navigation";
import { TransparentModalTo } from "./functions";
import { SCREENS } from "../screens";

export const ShowGroupFocus = ({ group }) => {
	TransparentModalTo(SCREENS.FOCUS, {
		isGroups: true,
		cardData: group
	});
};

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

export const ShowGroupSettings = ({ user, group }) => {
	TransparentModalTo(SCREENS.GROUP_SETTINGS, { user, group });
};

// export const ShowProfileSettings;
