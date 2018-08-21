import _ from "lodash";

import { ActionTypes } from "./actions";
import Navigator from "../lib/navigation";
import { SCREENS } from "../screens";
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

// function arrayUnique(array) {
// 	console.log("array: ", array);
// 	var a = array.concat();
// 	for (var i = 0; i < a.length; ++i) {
// 		for (var j = i + 1; j < a.length; ++j) {
// 			if (a[i].id === a[j].id) a.splice(j--, 1);
// 		}
// 	}
// 	console.log("a: ", a);
// 	return ;
// }

//////* APP *//////
const initialAppState = {
	// isUpdating: true,
	screen: SCREENS.HOME,
	// fetchingMoves: true,
	// fetchingGroups: true,
	// fetchingFriends: false,
	// fetchingRequests: false,
	// fetchingGoingUsers: false,
	focusedGroupId: "",
	focusedMoveId: ""
};

// function app(state = initialAppState, action, rootState) {
// 	switch (action.type) {
// 		case ActionTypes.SHOW_LOADING_OVERLAY:
// 			Navigator.showLoading();
// 			return { ...state };
// 		case ActionTypes.HIDE_LOADING_OVERLAY:
// 			Navigator.hideLoading();
// 			return { ...state };
// 		case ActionTypes.BEGIN_GOING_USERS_FETCH:
// 			return { ...state, fetchingGoingUsers: true };
// 		case ActionTypes.FINISH_GOING_USERS_FETCH:
// 			return { ...state, fetchingGoingUsers: false };
// 		default:
// 			return state;
// 	}
// }

//////* USER *//////
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

function user(state = initialUserState, action, rootState) {
	switch (action.type) {
		case ActionTypes.SET_USER:
			return { ...state, ...action.user };
		case ActionTypes.SET_LOCATION:
			return { ...state, location: action.userLocation };
		default:
			return state;
	}
}

//////* MOVES *//////
const initialMoveState = {
	moves: new Map()
};

function mergeMoves(prevState, newState) {
	console.log(prevState, newState);
	let merged = [...prevState.filter(e => !e.ended)];
	newState.forEach(move => {
		if (prevState.find(e => e.id === move.id) === undefined) merged.push({ ...move, going: [] });
	});
	return merged;
}

function moves(state = [], action, rootState) {
	// console.log("state: ", state1, "action: ", action);
	const { uid, name, fb_id } = rootState.user;
	let index;
	let updatedMove;

	// console.log("action.moves: ", action.moves);
	switch (action.type) {
		case ActionTypes.SET_MOVES:
			return mergeMoves(state, action.moves);
		// return [];
		// return action.moves;

		case ActionTypes.ADD_MOVE:
			return mergeMoves(state, [{ ...action.move, going: [{ uid, name, fb_id }] }]);
		case ActionTypes.END_MOVE:
			console.log("end move");
			index = _.findIndex(state, o => o.id === action.id);
			updatedMove = { ...state[index], ended: true };

			return [...state.slice(0, index), updatedMove, ...state.slice(index + 1)];
		case ActionTypes.SET_GOING_USERS:
			index = _.findIndex(state, o => o.id === action.id);
			updatedMove = { ...state[index], going: action.users };

			return [...state.slice(0, index), updatedMove, ...state.slice(index + 1)];
		case ActionTypes.JOIN_MOVE:
			index = _.findIndex(state, o => o.id === action.id);
			updatedMove = {
				...state[index],
				going: [...state[index].going, { uid, fb_id, name, ts: action.ts }]
			};

			return [...state.slice(0, index), updatedMove, ...state.slice(index + 1)];
		case ActionTypes.LEAVE_MOVE:
			index = _.findIndex(state, o => o.id === action.id);
			updatedMove = { ...state[index], going: state[index].going.filter(o => o.uid !== uid) };

			return [...state.slice(0, index), updatedMove, ...state.slice(index + 1)];
		default:
			return state;
	}
}

//////* GROUPS *//////
function mergeGroups(prevState, newState) {
	console.log(prevState, newState);
	let merged = [...prevState];
	newState.forEach(group => {
		if (prevState.find(e => e.id === group.id) === undefined) merged.push({ ...group });
	});
	return merged;
}

function groups(state = [], action, rootState) {
	const { user } = rootState;
	let index;
	let updatedGroup;

	switch (action.type) {
		case ActionTypes.SET_GROUPS:
			// return action.groups;
			// return [...state, ...action.groups];
			// return arrayUnique(state.concat(action.groups));
			return mergeGroups(state, action.groups);
		case ActionTypes.SET_GROUP_MEMBERS:
			index = _.findIndex(state, o => o.id === action.id);
			updatedGroup = { ...state[index], members: action.users };

			return [...state.slice(0, index), updatedGroup, ...state.slice(index + 1)];
		case ActionTypes.ADD_GROUP:
			return [...state, action.group];
		case ActionTypes.LEAVE_GROUP:
			let index;
			state.forEach((group, i) => {
				if (group.id === action.group.id) index = i;
			});
			return [...state.slice(0, index), ...state.slice(index + 1)];
		case ActionTypes.CHANGE_GROUP_NAME:
			index = _.findIndex(state, o => o.id === action.id);
			return [
				...state.slice(0, index),
				{ ...state[index], name: action.name },
				...state.slice(index + 1)
			];
		case ActionTypes.ADD_FRIEND_TO_GROUP:
			return [...state];
		case ActionTypes.CHANGE_GROUP_NAME:
			return [...state, action.group];
		default:
			return state;
	}
}

//////* FRIENDS *//////
const initialFriendsState = {
	friends: [],
	requests: []
};

function friends(state = initialFriendsState, action, rootState) {
	let index;
	switch (action.type) {
		case ActionTypes.SET_FRIENDS:
			return { ...state, friends: action.friends };
		// return { friends: [], requests: [] };
		case ActionTypes.SET_REQUESTS:
			return { ...state, requests: action.requests };
		// return { friends: [], requests: [] };
		case ActionTypes.ACCEPT_FRIEND_REQUEST:
			const newFriend = state.requests.find(e => e.uid === action.uid);
			index = _.findIndex(state.requests, e => e.uid === action.id);

			return {
				friends: [...state.friends, newFriend],
				requests: [...state.slice(0, index), ...state.slice(index + 1)]
			};
		case ActionTypes.DELETE_FRIEND_REQUEST:
			index = _.findIndex(state.requests, e => e.uid === action.sender_uid);

			return {
				friends: state.friends,
				requests: [...state.slice(0, index), ...state.slice(index + 1)]
			};
		case ActionTypes.DELETE_FRIEND:
			return [...state, action.friend];
		default:
			return state;
	}
}

//////* REQUESTS *//////
// function requests(state = [], action, rootState) {
// 	switch(action.type) {
// 		case ActionTypes.ACCEPT_FRIEND_REQUEST
// 	}
// }

// const seshApp = combineReducers({
// 	user,
// 	moves,
// 	joinedMoves,
// 	groups,
// 	friends
// });

const initialState = {
	user: initialUserState
};

const seshApp = (state = initialState, action) => {
	return {
		// app: app(state.app, action, state),
		user: user(state.user, action, state),
		moves: moves(state.moves, action, state),
		groups: groups(state.groups, action, state),
		friends: friends(state.friends, action, state)

		// app: app(state.app, action, state),
		// posts: posts(state.posts, action, state),
		// intl: intl(state.intl, action, state),
		// products: products(state.products, action, state),
		// pos: pos(state.pos, action, state),
		// cats: cats(state.cats, action, state),
	};
};

export default seshApp;
