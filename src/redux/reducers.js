import { combineReducers } from "redux";

import {
	SET_MOVES,
	SET_LOCATION,
	SET_USER,
	SET_GROUPS,
	SET_FRIENDS,
	ADD_MOVE,
	END_MOVE,
	JOIN_MOVE,
	ADD_GROUP,
	LEAVE_GROUP,
	CHANGE_GROUP_NAME,
	ADD_FRIEND_TO_GROUP,
	ACCEPT_FRIEND_REQUEST,
	DELETE_FRIEND_REQUEST,
	DELETE_FRIEND
} from "./actions";
// import {SCREENS} from "../screens";
// import Navigator from "../lib/navigation";

// function screen(state = SCREENS.HOME, action) {
// 	switch (action.type) {
// 		case NAVIGATE_TO_PROFILE:
// 			Navigator.ShowProfile();
// 			return SCREENS.PROFILE;
// 		case NAVIGATE_TO_EDIT_NAME;
// 			Navigator.ShowEdi
// 	}
// }

const initialUserState = {
	fb_id: "",
	uid: "",
	name: "",
	first_name: "",
	last_name: "",
	email: "",
	profile_pic: "",
	location: { latitude: 0.0, longitude: 0.0 }
};

function user(state = initialUserState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, ...action.user };
		case SET_LOCATION:
			return { ...state, location: action.userLocation };
		default:
			return state;
	}
}

function moves(state = [], action) {
	switch (action.type) {
		case SET_MOVES:
			return [...action.moves];
		case ADD_MOVE:
			return [...state, action.move];
		case END_MOVE:
			const { move } = action;
			return [move];
		case JOIN_MOVE:
			return [];
		default:
			return state;
	}
}

function groups(state = [], action) {
	switch (action.type) {
		case SET_GROUPS:
			return [...action.groups];
		case ADD_GROUP:
			return [...state, action.group];
		case LEAVE_GROUP:
			/* make api call */
			let index;
			state.forEach((group, i) => {
				if (group.id === action.group.id) index = i;
			});
			return [...state.slice(0, index), ...state.slice(index + 1)];
		case ADD_FRIEND_TO_GROUP:
			return [...state];
		case CHANGE_GROUP_NAME:
			return [...state, action.group];
		default:
			return state;
	}
}

function friends(state = [], action) {
	switch (action.type) {
		case SET_FRIENDS:
			return [...action.friends];
		case ACCEPT_FRIEND_REQUEST:
			return [...state, action.friend];
		case DELETE_FRIEND_REQUEST:
			return [...state, action.friend];
		case DELETE_FRIEND:
			return [...state, action.friend];
		default:
			return state;
	}
}

const seshApp = combineReducers({
	user,
	moves,
	groups,
	friends
});

export default seshApp;
