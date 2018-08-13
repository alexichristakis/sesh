import { Navigation } from "react-native-navigation";
import { TransparentModalTo } from "./functions";
import { SCREENS } from "../screens";

export const ShowGroupFocus = ({ group }) => {
	TransparentModalTo(SCREENS.FOCUS, {
		isGroups: true,
		data: group
	});
};

export const ShowMoveFocus = ({ props }) => {
	console.log("SCREENS: ", SCREENS);
	console.log("props: ", props);
	TransparentModalTo(SCREENS.FOCUS, {
		...props,
		isGroups: false
	});
};

export const ShowProfile = ({ user, data }) => {
	Navigation.showModal({
		component: {
			name: SCREENS.PROFILE,
			passProps: { user, data },
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

export const ShowCreateGroup = ({ user, friends }) => {
	Navigation.showModal({
		component: {
			name: SCREENS.CREATE_GROUP,
			passProps: {
				user,
				friends
			}
		}
	});
};

export const ShowAddFriend = ({ user }) => {
	Navigation.showModal({
		component: {
			name: SCREENS.ADD_FRIEND,
			passProps: {
				friends
			}
		}
	});
};

export const ShowGroupSettings = ({ user, group }) => {
	TransparentModalTo(SCREENS.GROUP_SETTINGS, { user, group });
};

// export const ShowProfileSettings;
