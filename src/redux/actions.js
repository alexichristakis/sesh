export const NAVIGATE_TO_PROFILE = "NAVIGATE_TO_PROFILE";
export const NAVIGATE_TO_CREATE_MOVE = "NAVIGATE_TO_CREATE_MOVE";
export const NAVIGATE_TO_ADD_TO_GROUP = "NAVIGATE_TO_ADD_TO_GROUP";
export const NAVIGATE_TO_EDIT_NAME = "NAVIGATE_TO_EDIT_NAME";

export const REQUEST_FRIENDS = "REQUEST_FRIENDS";
export const REQUEST_GROUPS = "REQUEST_GROUPS";
export const REQUEST_MOVES = "REQUEST_MOVES";

function requestFriends(user) {
	return {
		type: REQUEST_FRIENDS,
		user
	};
}

function requestGroups(user) {
	return {
		type: REQUEST_GROUPS,
		user
	};
}

function requestMoves(groups) {
	return {
		type: REQUEST_MOVES,
		groups
	};
}

export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_GROUPS = "RECEIVE_GROUPS";
export const RECEIVE_MOVES = "RECEIVE_MOVES";

function receiveFriends(user, response) {
	return {
		type: RECEIVE_FRIENDS,
		user,
		friends: response.dat,
		receivedAt: Date.now()
	};
}
