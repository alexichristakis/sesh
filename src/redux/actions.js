// export const NAVIGATE_TO_PROFILE = "NAVIGATE_TO_PROFILE";
// export const NAVIGATE_TO_CREATE_MOVE = "NAVIGATE_TO_CREATE_MOVE";
// export const NAVIGATE_TO_ADD_TO_GROUP = "NAVIGATE_TO_ADD_TO_GROUP";
// export const NAVIGATE_TO_EDIT_NAME = "NAVIGATE_TO_EDIT_NAME";

// export const REQUEST_FRIENDS = "REQUEST_FRIENDS";
// export const REQUEST_GROUPS = "REQUEST_GROUPS";
// export const REQUEST_MOVES = "REQUEST_MOVES";
import firebase from "react-native-firebase";

import api from "../api";
import { DismissMoveFocus, ShowLoadingOverlay, HideLoadingOverlay } from "../lib/navigation";

let firestore = firebase.firestore();

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
	SET_GROUP_MEMBERS: "SET_GROUP_MEMBERS",
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
export function attachListeners() {
	return (dispatch, getState) => {
		// dispatch(setMoves([]));
		return new Promise((resolve, reject) => {
			const state = getState();
			const { uid } = state.user;

			const groupsQuery = firestore.collection("groups").where("members", "array-contains", uid);
			const movesQuery = firestore.collection("moves").where("ended", "==", false);

			groupsQuery.onSnapshot(groupSnapshot => {
				let groups = [];
				groupSnapshot.docChanges.forEach(changedGroup => {
					const { type: groupChangeType, doc: group } = changedGroup;
					console.log("group: ", group);
					let group_id = group.id;
					if (groupChangeType === "added") {
						movesQuery.where("group_id", "==", group_id).onSnapshot(moveSnapshot => {
							let moves = [];
							moveSnapshot.docChanges.forEach(changedMove => {
								const { type: moveChangeType, doc: move } = changedMove;
								let move_id = move.id;
								if (moveChangeType === "added") {
									console.log("pushing move: ", move_id, move.data());
									moves.push({ id: move_id, ...move.data() });
								}
							});
							dispatch(setMoves(moves));
						});
						console.log("pushing group: ", group_id, group.data());
						groups.push({ id: group_id, ...group.data() });
					} else if (groupChangeType === "removed") {
						// remove
					}
				});
				dispatch(setGroups(groups));
			});

			// groupsQuery.onSnapshot(groupSnapshot => {
			// 	groupSnapshot.forEach(group => {
			// 		let group_id = group.id;
			// 		groups.push({ id: group_id, ...group.data() });

			// 		movesQuery.where("group_id", "==", group_id).onSnapshot(moveSnapshot => {
			// 			moveSnapshot.forEach(move => {
			// 				let move_id = move.id;
			// 				moves.push({ id: move_id, going: [], ...move.data() });
			// 			});

			// 			dispatch(setMoves(moves));
			// 		});
			// 	});

			// 	dispatch(setGroups(groups));
			// });
		});
	};
}

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

export function endMove(id) {
	return (dispatch, getState) => {
		return new Promise(resolve => {
			const state = getState();
			const { user } = state;

			ShowLoadingOverlay();
			api.EndMove({ move_id: id }).then(() => {
				dispatch(endMoveComplete(id));
				HideLoadingOverlay();
				// DismissMoveFocus();
				resolve(true);
			});
		});
	};
}

export function endMoveComplete(id) {
	return {
		type: ActionTypes.END_MOVE,
		id
	};
}

export function joinMove(id) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const state = getState();
			const { user } = state;
			const ts = Date.now();

			ShowLoadingOverlay();
			api
				.JoinMove({ user, move_id: id, ts })
				.then(() => {
					HideLoadingOverlay();
					dispatch(joinMoveComplete(id, ts));
					resolve(true);
				})
				.catch(error => {
					dispatch(postError(error));
					reject(error);
				});
		});
	};
}

export function joinMoveComplete(id, ts) {
	return {
		type: ActionTypes.JOIN_MOVE,
		id,
		ts
	};
}

export function leaveMove(id) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const { user } = getState();
			ShowLoadingOverlay();
			api
				.LeaveMove({ user, move_id: id })
				.then(() => {
					HideLoadingOverlay();
					dispatch(leaveMoveComplete(id));
					resolve(true);
				})
				.catch(error => {
					dispatch(postError(error));
					reject(error);
				});
		});
	};
}

export function leaveMoveComplete(id) {
	return {
		type: ActionTypes.LEAVE_MOVE,
		id
	};
}

export function fetchGoingUsers(id) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			api
				.FetchGoingUsers({ move_id: id })
				.then(users => {
					dispatch(setGoingUsers(id, users));
					resolve(true);
				})
				.catch(error => {
					dispatch(fetchError(error));
					reject(error);
				});
		});
	};
}

export function setGoingUsers(id, users) {
	return {
		type: ActionTypes.SET_GOING_USERS,
		id,
		users
	};
}

/* groups */
export function fetchGroupMembers(id) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			console.log("fetching group members: ", id);
			api
				.FetchGroupMembers({ group_id: id })
				.then(users => {
					console.log("users in fetch: ", users);
					dispatch(setGroupMembers(id, users));
					resolve(true);
				})
				.catch(error => {
					dispatch(fetchError(error));
					reject(error);
				});
		});
	};
}

export function setGroupMembers(id, users) {
	return {
		type: ActionTypes.SET_GROUP_MEMBERS,
		id,
		users
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

export function createGroup(name, members) {
	return (dispatch, getState) => {
		return new Promise(resolve => {
			const state = getState();
			const { user } = state;

			api.CreateGroup({ group_name: name, user, members }).then(() => {
				dispatch(createGroupComplete(name, members));
				resolve(true);
			});
		});
	};
}

export function createGroupComplete(name, members) {
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
