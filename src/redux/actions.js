// export const NAVIGATE_TO_PROFILE = "NAVIGATE_TO_PROFILE";
// export const NAVIGATE_TO_CREATE_MOVE = "NAVIGATE_TO_CREATE_MOVE";
// export const NAVIGATE_TO_ADD_TO_GROUP = "NAVIGATE_TO_ADD_TO_GROUP";
// export const NAVIGATE_TO_EDIT_NAME = "NAVIGATE_TO_EDIT_NAME";

// export const REQUEST_FRIENDS = "REQUEST_FRIENDS";
// export const REQUEST_GROUPS = "REQUEST_GROUPS";
// export const REQUEST_MOVES = "REQUEST_MOVES";

import api from "../api";
import { ShowLoadingOverlay, HideLoadingOverlay } from "../lib/navigation";

export const ActionTypes = {
	SET_MOVES: "SET_MOVES",
	SET_LOCATION: "SET_LOCATION",
	SET_USER: "SET_USER",
	SET_GROUPS: "SET_GROUPS",
	SET_FRIENDS: "SET_FRIENDS",
	SET_JOINED_MOVES: "SET_JOINED_MOVES",
	JOIN_MOVE: "JOIN_MOVE",
	LEAVE_MOVE: "LEAVE_MOVE",
	ADD_MOVE: "ADD_MOVE",
	END_MOVE: "END_MOVE",
	SET_GOING_USERS: "SET_GOING_USERS",
	CREATE_GROUP: "CREATE_GROUP",
	LEAVE_GROUP: "LEAVE_GROUP",
	CHANGE_GROUP_NAME: "CHANGE_GROUP_NAME",
	ADD_FRIEND_TO_GROUP: "ADD_FRIEND_TO_GROUP",
	ACCEPT_FRIEND_REQUEST: "ACCEPT_FRIEND_REQUEST",
	DELETE_FRIEND_REQUEST: "DELETE_FRIEND_REQUEST",
	DELETE_FRIEND: "DELETE_FRIEND",
	SHOW_LOADING_OVERLAY: "SHOW_LOADING_OVERLAY",
	BEGIN_GOING_USERS_FETCH: "BEGIN_GOING_USERS_FETCH",
	FINISH_GOING_USERS_FETCH: "FINISH_GOING_USERS_FETCH"
};

/* general */
export function loadingOverlay() {
	return {
		type: ActionTypes.SHOW_LOADING_OVERLAY
	};
}

export function finishedUpdating() {
	return {
		type: ActionTypes.FINISHED_UPDATING
	};
}

export function postError(error) {
	console.log("theres been an error: ", error);
	return {
		type: ActionTypes.POST_ERROR
	};
}

export function fetchError(error) {
	return {
		type: ActionTypes.FETCH_ERROR
	};
}

/* moves */
export function setMoves(moves) {
	return {
		type: ActionTypes.SET_MOVES,
		moves
	};
}

export function addMove(move) {
	return (dispatch, getState) => {
		return new Promise(resolve => {
			const state = getState();
			const { user } = state;

			ShowLoadingOverlay();
			api.SendMove({ move, user }).then(() => {
				dispatch(addMoveComplete(move));
				HideLoadingOverlay();
				resolve(true);
			});
		});
	};
}

export function addMoveComplete(move) {
	return {
		type: ActionTypes.ADD_MOVE,
		move
	};
}

export function joinMove(id) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const state = getState();
			const { user } = state;

			api
				.JoinMove({ user, move_id: id })
				.then(() => {
					// dispatch(finishedUpdating());
					dispatch(joinMoveComplete(id));
				})
				.catch(error => {
					dispatch(postError(error));
					reject(error);
				});
		});
	};
}

export function joinMoveComplete(id) {
	console.log("join move complete");
	return {
		type: ActionTypes.JOIN_MOVE,
		id
	};
}

export function fetchGoingUsers(id) {
	console.log("inside action: ", id);
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			dispatch(fetchGoingUsersInit());

			api
				.FetchGoingUsers({ move_id: id })
				.then(users => {
					dispatch(setGoingUsers(id, users));
				})
				.catch(error => {
					dispatch(fetchError(error));
					reject(error);
				});
		});
	};
}

export function fetchGoingUsersInit() {
	return {
		type: ActionTypes.BEGIN_GOING_USERS_FETCH
	};
}

export function fetchGoingUsersComplete() {
	return {
		type: ActionTypes.FINISH_GOING_USERS_FETCH
	};
}

export function setGoingUsers(id, users) {
	return (dispatch, getState) => {
		dispatch(fetchGoingUsersComplete());
		return {
			type: ActionTypes.SET_GOING_USERS,
			id,
			users
		};
	};
}

/* user */
export function setLocation(userLocation) {
	return {
		type: ActionTypes.SET_LOCATION,
		userLocation
	};
}

export function setUser(user) {
	return {
		type: ActionTypes.SET_USER,
		user
	};
}

/* groups */
export function setGroups(groups) {
	return {
		type: ActionTypes.SET_GROUPS,
		groups
	};
}

export function leaveGroup(group) {
	return {
		type: ActionTypes.LEAVE_GROUP,
		group
	};
}

export function createGroup({ group, members }) {
	return {
		type: ActionTypes.CREATE_GROUP,
		group,
		members
	};
}

export function setFriends(friends) {
	return {
		type: ActionTypes.SET_FRIENDS,
		friends
	};
}
