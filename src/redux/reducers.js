import { ActionTypes } from "./actions";
import Navigator from "../lib/navigation";
// import { SCREENS } from "../screens";
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
// const initialAppState = {
// 	// isUpdating: true,
// 	// screen: SCREENS.HOME,
// 	fetchingMoves: true,
// 	fetchingGroups: true,
// 	fetchingFriends: false,
// 	fetchingRequests: false,
// 	fetchingGoingUsers: false
// };

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
function moves(state = [], action, rootState) {
	console.log("root state in moves reducer ", rootState);
	const { uid, name, fb_id } = rootState.user;
	let index;
	let updatedMove;

	switch (action.type) {
		case ActionTypes.SET_MOVES:
			// return [...state, ...action.moves];
			// return arrayUnique(state, action.moves);
			return action.moves;
		case ActionTypes.ADD_MOVE:
			let updatedMove = { ...action.move, going: [{ uid, name, fb_id }] };
			return [...state, updatedMove];
		case ActionTypes.END_MOVE:
			const { move } = action;
			return [move];
		case ActionTypes.SET_GOING_USERS:
			state.forEach((move, i) => {
				if (move.id === action.id) {
					index = i;
					updatedMove = { ...move, going: action.users };
				}
			});

			return [...state.slice(0, index), ...state.slice(index + 1), updatedMove];
		case ActionTypes.JOIN_MOVE:
			state.forEach((move, i) => {
				if (move.id === action.id) {
					index = i;
					updatedMove = { ...move, going: [...move.going, { uid, fb_id, name }] };
				}
			});

			return [...state.slice(0, index), ...state.slice(index + 1), updatedMove];
		default:
			return state;
	}
}

//////* GROUPS *//////
function groups(state = [], action, rootState) {
	const { user } = rootState;
	switch (action.type) {
		case ActionTypes.SET_GROUPS:
			return action.groups;
		// return [...state, ...action.groups];
		// return arrayUnique(state.concat(action.groups));
		case ActionTypes.ADD_GROUP:
			return [...state, action.group];
		case ActionTypes.LEAVE_GROUP:
			let index;
			state.forEach((group, i) => {
				if (group.id === action.group.id) index = i;
			});
			return [...state.slice(0, index), ...state.slice(index + 1)];
		case ActionTypes.ADD_FRIEND_TO_GROUP:
			return [...state];
		case ActionTypes.CHANGE_GROUP_NAME:
			return [...state, action.group];
		default:
			return state;
	}
}

//////* FRIENDS *//////
function friends(state = [], action, rootState) {
	switch (action.type) {
		case ActionTypes.SET_FRIENDS:
			return action.friends;
		case ActionTypes.ACCEPT_FRIEND_REQUEST:
			return [...state, action.friend];
		case ActionTypes.DELETE_FRIEND_REQUEST:
			return [...state, action.friend];
		case ActionTypes.DELETE_FRIEND:
			return [...state, action.friend];
		default:
			return state;
	}
}

//////* REQUESTS *//////
// function requests(state = [], action, rootState) {
// 	switch(action.type) {
// 		case ActionTypes.
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
