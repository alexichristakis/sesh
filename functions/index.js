const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNewMoveNotification = functions.firestore
	.document("moves/{move_id}")
	.onCreate((snap, context) => {
		const data = snap.data();
		const { sender_name, group_name, group_id, description } = data;

		let payload = {
			notification: {
				title: group_name,
				body: `${sender_name}: ${description}`
			}
		};

		let tokenPromises = [];

		const groupMembersRef = admin
			.firestore()
			.collection("groups")
			.doc(group_id)
			.collection("members");

		// let groupMembers = groupMembersRef.get();
		// groupMembers.forEach(doc => {
		// 	const uid = doc.data().uid;
		// 	tokenPromises.push(
		// 		admin
		// 			.firestore()
		// 			.collection("users")
		// 			.doc(uid)
		// 			.get()
		// 	);
		// });

		return groupMembersRef.get().then(snapshot => {
			snapshot.forEach(doc => {
				const uid = doc.data().uid;
				tokenPromises.push(
					admin
						.firestore()
						.collection("users")
						.doc(uid)
						.get()
				);
			});

			return Promise.all(tokenPromises).then(results => {
				const tokens = results.map(doc => doc.data().fcm_token);
				return admin.messaging().sendToDevice(tokens, payload);
			});
		});
	});

exports.sendFriendRequestNotification = functions.firestore
	.document("users/{recipient_uid}/received_friend_requests/{sender_uid}")
	.onCreate((snap, context) => {
		const data = snap.data();
		const { name } = data;

		let payload = {
			notification: {
				body: `${name} added you as a friend!`
			}
		};

		const userRef = admin
			.firestore()
			.collection("users")
			.doc(context.params.recipient_uid);

		return userRef.get().then(doc => {
			const { fcm_token } = doc.data();
			return admin.messaging().sendToDevice(fcm_token, payload);
		});
	});

exports.sendAddedToGroupNotification = functions.firestore
	.document("groups/{group_id}/members/{new_user_uid}")
	.onCreate((snap, context) => {
		const data = snap.data();
		const { added_by } = data; // TODO: currently undefined value

		let userPromise = admin
			.firestore()
			.collection("users")
			.doc(context.params.new_user_uid)
			.get();
		let groupPromise = admin
			.firestore()
			.collection("groups")
			.doc(context.params.group_id)
			.get();

		return Promise.all([userPromise, groupPromise]).then(results => {
			let userDoc = results[0];
			let groupDoc = results[1];

			let payload = {
				notification: {
					body: `${added_by} added you to ${groupDoc.data().name}!`
				}
			};

			return admin.messaging().sendToDevice(userDoc.data().fcm_token, payload);
		});
	});
