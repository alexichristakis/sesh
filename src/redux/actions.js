// export const NAVIGATE_TO_PROFILE = "NAVIGATE_TO_PROFILE";
// export const NAVIGATE_TO_CREATE_MOVE = "NAVIGATE_TO_CREATE_MOVE";
// export const NAVIGATE_TO_ADD_TO_GROUP = "NAVIGATE_TO_ADD_TO_GROUP";
// export const NAVIGATE_TO_EDIT_NAME = "NAVIGATE_TO_EDIT_NAME";

// export const REQUEST_FRIENDS = "REQUEST_FRIENDS";
// export const REQUEST_GROUPS = "REQUEST_GROUPS";
// export const REQUEST_MOVES = "REQUEST_MOVES";

export const SET_MOVES = "SET_MOVES";
export const SET_LOCATION = "SET_LOCATION";
export const SET_USER = "SET_USER";
export const SET_GROUPS = "SET_GROUPS";
export const SET_FRIENDS = "SET_FRIENDS";

export const ADD_MOVE = "ADD_MOVE";
export const END_MOVE = "END_MOVE";
export const JOIN_MOVE = "JOIN_MOVE";
export const ADD_GROUP = "ADD_GROUP";
export const LEAVE_GROUP = "LEAVE_GROUP";
export const CHANGE_GROUP_NAME = "CHANGE_GROUP_NAME";
export const ADD_FRIEND_TO_GROUP = "ADD_FRIEND_TO_GROUP";
export const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";
export const DELETE_FRIEND_REQUEST = "DELETE_FRIEND_REQUEST";
export const DELETE_FRIEND = "DELETE_FRIEND";

export function setMoves(moves) {
	return {
		type: SET_MOVES,
		moves
	};
}

export function addMove(move) {
	return {
		type: ADD_MOVE,
		move
	}
}

export function setLocation(userLocation) {
	return {
		type: SET_LOCATION,
		userLocation
	};
}

export function setUser(user) {
	return {
		type: SET_USER,
		user
	};
}

export function setGroups(groups) {
	return {
		type: SET_GROUPS,
		groups
	};
}

export function setFriends(friends) {
	return {
		type: SET_FRIENDS,
		friends
	};
}

export function leaveGroup(group, user) {
	return {
		type: LEAVE_GROUP,
		group,
		user
	};
}
