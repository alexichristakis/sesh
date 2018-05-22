import { AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";
let firestore = firebase.firestore();
let storage = firebase.storage();

//////////////* STORAGE *//////////////

//////////////* FIRESTORE *//////////////
/* GET */

export const GetUser = () => {
	return new Promise(async resolve => {
		let currentUser = await firebase.auth().currentUser;
		// if (currentUser) resolve(currentUser);

		let uid = currentUser.uid;
		let ref = firestore.collection("users").doc(uid);
		ref.get().then(doc => {
			resolve(doc.data());
		});
	});
};

/* SET */

//////////////* AUTH *//////////////
export const UserAuthenticated = () => {
	return new Promise(resolve => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				resolve(user);
			} else {
				resolve(false);
			}
		});
	});
};

export const FacebookLogin = async cancelLogin => {
	try {
		const result = await LoginManager.logInWithReadPermissions(["public_profile", "email"]);

		if (result.isCancelled) {
			cancelLogin();
			console.log("canceled facebook"); // Handle this however fits the flow of your app
		} else {
			console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

			// get the access token
			const data = await AccessToken.getCurrentAccessToken();

			if (!data) {
				throw new Error("Something went wrong obtaining the users access token");
			}

			// create a new firebase credential with the token
			const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

			// login with credential
			const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

			if (currentUser.additionalUserInfo.isNewUser) {
				// store in Firestore
				await NewUser(currentUser);
			}
			return currentUser;
		}
	} catch (e) {
		console.error(e);
	}
};

const NewUser = user => {
	return new Promise(resolve => {
		let email = user.user._user.email;
		let first_name = user.additionalUserInfo.profile.first_name;
		let last_name = user.additionalUserInfo.profile.last_name;
		let display_name = user.additionalUserInfo.profile.name;
		let id = user.additionalUserInfo.profile.id;
		let profile_pic = "https://graph.facebook.com/" + id + "/picture?type=large";
		let uid = user.user._user.uid;

		firestore
			.collection("users")
			.doc(uid)
			.set({
				email,
				first_name,
				last_name,
				display_name,
				id,
				uid,
				profile_pic,
			})
			.then(resolve(true));
	});
};

export const FacebookLogout = async () => {
	firebase.auth().signOut();
};
