import firebase from "react-native-firebase";

import api from "../api";
import { DismissMoveFocus, ShowLoadingOverlay, HideLoadingOverlay } from "../lib/navigation";

let firestore = firebase.firestore();
const USERS = firestore.collection("users");
const GROUPS = firestore.collection("groups");
const MOVES = firestore.collection("moves");

export const ActionTypes = {
	SET_MOVES: "SET_MOVES",
	SET_LOCATION: "SET_LOCATION",
	SET_USER: "SET_USER",
	SET_GROUPS: "SET_GROUPS",
	SET_FRIENDS: "SET_FRIENDS",
	SET_REQUESTS: "SET_REQUESTS",
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
		return new Promise(async (resolve, reject) => {
			const state = getState();
			const { uid } = state.user;

			fcm(uid);

			// queries
			// const groupsQuery = firestore.collection("groups").where("members", "array-contains", uid);
			// let groups = await firestore
			// 	.collection("users")
			// 	.doc(uid)
			// 	.collection("groups")
			// 	.get();

			// let group_ids = [];
			// groups.forEach(snapshot => group_ids.push(snapshot.id));

			// console.log("GROUPS: ", group_ids);

			const groupsQuery = USERS.doc(uid).collection("groups");
			const movesQuery = MOVES.where("ended", "==", false);

			// refs
			const friendsRef = USERS.doc(uid).collection("friends");
			const requestsRef = USERS.doc(uid).collection("received_friend_requests");

			groupsQuery.onSnapshot(groupSnapshot => {
				let groups = [];
				groupSnapshot.docChanges.forEach(async changedGroup => {
					console.log("***** CHANGED GROUP *****");
					const { type: groupChangeType, doc: group } = changedGroup;
					console.log("group: ", group);
					let group_id = group.id;
					if (groupChangeType === "added") {
						movesQuery.where("group_id", "==", group_id).onSnapshot(moveSnapshot => {
							console.log("MOVE FOUND");
							let moves = [];
							moveSnapshot.docChanges.forEach(changedMove => {
								const { type: moveChangeType, doc: move } = changedMove;
								console.log(changedMove, move);
								if (moveChangeType === "added") moves.push({ id: move.id, ...move.data() });
								// else if (moveChangeType === "modified")
							});
							console.log("MOVES: ", moves);

							/* set the moves in redux */
							dispatch(setMoves(moves));
						});
						// console.log("pushing group: ", group_id, group.data());

						// let group_data = await GROUPS.doc(group_id).get();
						// groups.push({ id: group_id, ...group_data.data() });
						// groups.push({ id: group_id });
						groups.push(GROUPS.doc(group_id).get());
					} else if (groupChangeType === "removed") {
						// remove
					}
				});

				Promise.all(groups).then(data => {
					data = data.map(snapshot => {
						return { id: snapshot.id, ...snapshot.data() };
					});
					dispatch(setGroups(data));
				});

				/* set the groups in redux */
				// dispatch(setGroups(groups));
			});

			friendsRef.onSnapshot(friendsSnapshot => {
				let friends = [];
				friendsSnapshot.docChanges.forEach(changedFriend => {
					const { type: friendChangeType, doc: friend } = changedFriend;
					if (friendChangeType === "added") {
						friends.push(friend.data());
					}
				});
				dispatch(setFriends(friends));
			});

			requestsRef.onSnapshot(requestsSnapshot => {
				let requests = [];
				requestsSnapshot.docChanges.forEach(changedRequest => {
					const { type: requestChangeType, doc: request } = changedRequest;
					if (requestChangeType === "added") {
						requests.push(request.data());
					} else if (requestChangeType === "removed") {
						//
					}
				});
				dispatch(setRequests(requests));
			});
		});
	};
}

export function fcm(uid) {
	firebase
		.messaging()
		.getToken()
		.then(fcmToken => {
			if (fcmToken) {
				// user has a device token
				// dispatch(updateUser({ fcmToken }));
				api.UpdateUser({ uid, fcmToken });
			} else {
				// user doesn't have a device token yet
			}
		});

	firebase
		.messaging()
		.hasPermission()
		.then(enabled => {
			if (enabled) {
				// user has permissions
			} else {
				// user doesn't have permission
				firebase.messaging().requestPermission();
			}
		});
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
	// console.log("theres been an error: ", error);
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
			const { user } = getState();
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
			// console.log("fetching group members: ", id);
			api
				.FetchGroupMembers({ group_id: id })
				.then(users => {
					// console.log("users in fetch: ", users);
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

export function setFriends(friends) {
	return {
		type: ActionTypes.SET_FRIENDS,
		friends
	};
}

export function setRequests(requests) {
	return {
		type: ActionTypes.SET_REQUESTS,
		requests
	};
}

// export function updateUser({fcmToken}) {

// 	return {
// 		type: ActionTypes.UPDATE_USER,
// 		fcmToken
// 	}
// }

export function sendFriendRequest(uid) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const { user } = getState();

			ShowLoadingOverlay();
			api.SendFriendRequest({ user, uid }).then(() => {
				HideLoadingOverlay();
			});
		});
	};
}

export function acceptFriend(uid) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const { user } = getState();

			ShowLoadingOverlay();
			api.AcceptFriend({ user, uid }).then(() => {
				HideLoadingOverlay();
				dispatch(acceptFriendComplete(uid));
			});
		});
	};
}

export function acceptFriendComplete(uid) {
	return {
		type: ActionTypes.ACCEPT_FRIEND_REQUEST,
		uid
	};
}

export function deleteRequest(uid) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const { user } = getState();

			ShowLoadingOverlay();
			api.DeleteRequest({ user, uid }).then(() => {
				HideLoadingOverlay();
				dispatch(deleteRequestComplete(uid));
			});
		});
	};
}

export function deleteRequestComplete(sender_uid) {
	return {
		type: ActionTypes.DELETE_FRIEND_REQUEST,
		sender_uid
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

export function changeGroupName(group_id, group_name) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			api.ChangeGroupName({ group_id, group_name }).then(() => {
				dispatch(changeGroupNameComplete(group_id, group_name));
				resolve(true);
			});
		});
	};
}

export function changeGroupNameComplete(id, name) {
	return {
		type: ActionTypes.CHANGE_GROUP_NAME,
		id,
		name
	};
}

export function createGroup(group_name, selectedUIDs) {
	return (dispatch, getState) => {
		return new Promise(resolve => {
			const state = getState();
			const { user, friends } = state;
			ShowLoadingOverlay();

			/* generate members array */
			let members = [];
			selectedUIDs.forEach(uid => {
				const { name, fb_id } = friends.friends.find(e => e.uid === uid);
				members.push({ uid, name, fb_id });
			});

			const { uid, name, fb_id } = user;
			members.push({ uid, name, fb_id });
			// console.log("members: ", members);

			api.CreateGroup({ group_name, user, members }).then(() => {
				HideLoadingOverlay();
				dispatch(createGroupComplete(group_name, members));
				resolve(true);
			});
		});
	};
}

export function createGroupComplete(name, members) {
	return {
		type: ActionTypes.CREATE_GROUP,
		name,
		members
	};
}
