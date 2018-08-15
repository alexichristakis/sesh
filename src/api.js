import { Platform } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";
import RNFS from "react-native-fs";
let firestore = firebase.firestore();
let storage = firebase.storage();

//////////////* MISC. *//////////////
const getFileName = name => {
  const FILE = Platform.OS === "ios" ? "" : "file://";
  return FILE + RNFS.DocumentDirectoryPath + "/" + name + ".png";
};

export const DownloadPhoto = (name, source_url) => {
  return new Promise(resolve => {
    const fileName = getFileName(name);
    return RNFS.exists(fileName)
      .then(response => {
        if (response) {
          resolve({ uri: fileName });
        } else {
          const destination_path = "/" + name + ".png";
          return RNFS.downloadFile({
            fromUrl: source_url,
            toFile: RNFS.DocumentDirectoryPath + destination_path
          })
            .promise.then(response => {
              resolve({ uri: fileName });
            })
            .catch(error => {
              resolve({ uri: source_url });
            });
        }
      })
      .catch(error => {
        resolve({ uri: source_url });
      });
  });
};

//////////////* SETUP *//////////////
// export const SetupRNFS = () => {
//  let path = RNFS.DocumentDirectoryPath;
//  RNFS.mkdir(path + "/photos");
//  RNFS.mkdir(path + "/groups");
//  RNFS.mkdir(path + "/moves");
// };

//////////////* STORAGE *//////////////

//////////////* FIRESTORE *//////////////
///* GET *///
// store in the cloud?
export const GetMoves = fromGroups => {
  // go through each group, download active moves
};

// get the users who have rsvped to a certain move

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
export const SendMove = ({ move, user }) => {
  return new Promise(resolve => {
    const { id, group_id } = move;
    const { name, uid, fb_id } = user;

    const moveRef = firestore.collection("moves").doc(id);
    const groupRef = firestore
      .collection("groups")
      .doc(group_id)
      .collection("moves")
      .doc(id);

    let movePromise1 = moveRef.set(move);
    let movePromise2 = moveRef
      .collection("going")
      .doc(uid)
      .set({ name, uid, fb_id });
    let groupPromise = groupRef.set({ id });

    Promise.all([movePromise1, movePromise2, groupPromise]).then(() => resolve(true));
  });
};

export const JoinMove = ({ user, move_id }) => {
  return new Promise(resolve => {
    const { uid, fb_id, name } = user;
    const ref = firestore
      .collection("moves")
      .doc(move_id)
      .collection("joined_users")
      .doc(uid);

    ref.set({ uid, fb_id, name }).then(() => resolve(true));
  });
};

export const FetchGoingUsers = ({ move_id }) => {
  return new Promise(resolve => {
    const ref = firestore
      .collection("moves")
      .doc(move_id)
      .collection("joined_users");

    let users = [];
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        users.push(doc.data());
      });

      resolve(users);
    });
  });
};

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
        console.log("user authenticated: ", user);
        const { uid } = user;
        const ref = firestore.collection("users").doc(uid);
        ref.get().then(doc => {
          resolve(doc.data());
        });

        /* TODO: download full user object from firebase */
        // resolve(user);
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

      const { additionalUserInfo, user } = currentUser;
      const { id, email, name, first_name, last_name } = additionalUserInfo.profile;
      const { uid } = user;

      const profile_pic = `https://graph.facebook.com/${id}/picture?type=large`;

      const userObj = {
        fb_id: id,
        uid,
        email,
        name,
        first_name,
        last_name,
        profile_pic
      };

      if (additionalUserInfo.isNewUser) await NewUser(userObj);

      return userObj;
    }
  } catch (e) {
    console.error(e);
  }
};

const NewUser = userObj => {
  return new Promise(resolve => {
    /* set in RNFS? */

    firestore
      .collection("users")
      .doc(userObj.uid)
      .set(userObj)
      .then(() => resolve(true));
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

export default {
  SendMove,
  JoinMove,
  FetchGoingUsers,
  UserAuthenticated
};
