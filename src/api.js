import { AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";
// import RNFS from "react-native-fs";
let firestore = firebase.firestore();
let storage = firebase.storage();

//////////////* MISC. *//////////////
export const DownloadPhoto = url => {
  return new Promise(resolve => {
    fetch(url).then(response => resolve(response));
  });
};

//////////////* SETUP *//////////////
// export const SetupRNFS = () => {
// 	let path = RNFS.DocumentDirectoryPath;
// 	RNFS.mkdir(path + "/photos");
// 	RNFS.mkdir(path + "/groups");
// 	RNFS.mkdir(path + "/moves");
// };

//////////////* STORAGE *//////////////

//////////////* FIRESTORE *//////////////
///* GET *///
// store in the cloud?
export const GetMoves = fromGroups => {
  // go through each group, download active moves
};

export const GetJoinedUsers = move => {
  // get the users who have rsvped to a certain move
};

// store locally?
export const GetGroups = () => {};

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

///* SET *///
// note: firebase.firestore.GeoPoint(latitude, longitude)
/* MOVES */
export const SendMove = move => {
  /* firestore.collection("moves").doc() */
};

export const JoinMove = move => {};

export const EndMove = move => {};

/* FRIENDS */
export const SendFriendRequest = toUser => {};

export const AcceptFriend = user => {};

export const DeleteFriend = user => {};

/* GROUPS */
export const CreateGroup = (group, users) => {};

export const RenameGroup = (group, newName) => {};

export const LeaveGroup = group => {};

//////////////* AUTH *//////////////
export const UserAuthenticated = () => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        /* TODO: download full user object from firebase */
        resolve(user);
      } else resolve(false);
    });
  });
};

export const FacebookLogin = async cancelLogin => {
  try {
    const result = await LoginManager.logInWithReadPermissions(["public_profile", "email"]);

    if (result.isCancelled) {
      cancelLogin();
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
      // console.log(Promise.all(firebase.auth().signInAndRetrieveDataWithCredential(credential)));
      // console.log("currentUser: ", currentUser.user);
      const { additionalUserInfo, user } = currentUser;
      if (additionalUserInfo.isNewUser) await NewUser(additionalUserInfo.profile, user);

      return currentUser;
    }
  } catch (e) {
    console.error(e);
  }
};

const NewUser = ({ id, email, first_name, last_name, display_name }, { uid }) => {
  return new Promise(resolve => {
    const profile_pic = `https://graph.facebook.com/${id}/picture?type=large`;
    const user = {
      fb_id: id,
      uid,
      email,
      first_name,
      last_name,
      display_name,
      profile_pic
    };

    console.log(user);

    /* set in RNFS? */

    firestore
      .collection("users")
      .doc(uid)
      .set(user)
      .then(resolve(true));
  });
};

export const FacebookLogout = async () => {
  return new Promise(resolve => {
    firebase
      .auth()
      .signOut()
      .then(() => resolve(true));
  });
};
