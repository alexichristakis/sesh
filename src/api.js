import { Platform } from "react-native";
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import Contacts from "react-native-contacts";
import firebase from "react-native-firebase";
import RNFS from "react-native-fs";

let firestore = firebase.firestore();
let storage = firebase.storage();

//////////////* GRAPH API *//////////////
export const FetchFriendsList = ({ fb_id }) => {
  const friendListRequest = new GraphRequest(`/${fb_id}/friendlists`, null, (error, result) => {
    if (error) console.log(error);
    else console.log(result);
  });

  new GraphRequestManager().addRequest(friendListRequest).start();
};

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

export const SyncContacts = () => {
  return new Promise((resolve, reject) => {
    //     Contacts.checkPermission((err, permission) => {
    //   if (err) throw err;

    //   // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
    //   if (permission === 'undefined') {
    //     Contacts.requestPermission((err, permission) => {
    //       // ...
    //     })
    //   }
    //   if (permission === 'authorized') {
    //     // yay!
    //   }
    //   if (permission === 'denied') {
    //     // x.x
    //   }
    // })
    Contacts.getAll((err, contacts) => {
      if (err) throw reject(err);

      // contacts returned
      resolve(contacts);
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
export const SearchForUser = ({ first, last = "" }) => {
  return new Promise((resolve, reject) => {
    console.log(first, last);
    let query = firestore.collection("indices").where("first", "array-contains", first);
    //.where("last", "array_contains", last);

    query.get().then(results => {
      let users = [];
      results.forEach(doc => {
        const data = doc.data();
        const { name, fb_id } = data;
        users.push({ uid: doc.id, name, fb_id });
      });
      console.log(users);
      resolve(users);
    });
  });
};

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

export const FetchGroupMembers = ({ group_id }) => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("groups")
      .doc(group_id)
      .collection("members");

    console.log(group_id);

    let users = [];
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        users.push(doc.data());
      });

      resolve(users);
    });
  });
};

///* SET *///
// note: firebase.firestore.GeoPoint(latitude, longitude)
/* MOVES */
export const SendMove = ({ move, user }) => {
  return new Promise(resolve => {
    const { id, group_id } = move;
    console.log("id for the move: ", id);
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

export const JoinMove = ({ user, move_id, ts }) => {
  return new Promise(resolve => {
    const { uid, fb_id, name } = user;
    const ref = firestore
      .collection("moves")
      .doc(move_id)
      .collection("going")
      .doc(uid);

    ref.set({ uid, fb_id, name, ts }).then(() => resolve(true));
  });
};

export const LeaveMove = ({ user, move_id }) => {
  return new Promise(resolve => {
    const { uid, fb_id, name } = user;
    const ref = firestore
      .collection("moves")
      .doc(move_id)
      .collection("going")
      .doc(uid);

    ref.delete().then(() => resolve(true));
  });
};

export const FetchGoingUsers = ({ move_id }) => {
  return new Promise(resolve => {
    const ref = firestore
      .collection("moves")
      .doc(move_id)
      .collection("going");

    let users = [];
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        users.push(doc.data());
      });

      resolve(users);
    });
  });
};

export const EndMove = ({ move_id }) => {
  return new Promise(resolve => {
    const ref = firestore.collection("moves").doc(move_id);
    ref.set({ ended: true }, { merge: true }).then(() => resolve(true));
  });
};

/* FRIENDS */
export const SendFriendRequest = toUser => {};

export const AcceptFriend = user => {};

export const DeleteFriend = user => {};

/* GROUPS */
export const CreateGroup = ({ group_name, user, members }) => {
  return new Promise(resolve => {
    const { uid, name, fb_id } = user;
    const group = {
      name: group_name,
      created_by: uid,
      created_at: Date.now(),
      size: members.length
    };

    firestore
      .collection("groups")
      .add(group)
      .then(docRef => {
        let ref = docRef.collection("members");

        let batch = firestore.batch();
        members.forEach(member => {
          // console.log("member: ", member);
          batch.set(ref.doc(member.uid), {
            uid: member.uid,
            fb_id: member.fb_id,
            name: member.name
          });
        });

        batch
          .commit()
          .then(() => resolve(true))
          .catch(err => console.log(err));
      });
  });
};

export const RenameGroup = (group, newName) => {};

export const LeaveGroup = group => {};

//////////////* AUTH *//////////////
export const UserAuthenticated = () => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log("user authenticated: ", user);
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
    const result = await LoginManager.logInWithReadPermissions([
      "public_profile",
      "email",
      "user_friends"
    ]);

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

export const NewUser = userObj => {
  return new Promise(resolve => {
    const { uid, name, fb_id, first_name, last_name } = userObj;
    const first_name_lower = first_name.toLowerCase();
    const last_name_lower = last_name.toLowerCase();

    let first = [];
    for (var i = 1; i <= first_name.length; i++) {
      first.push(first_name_lower.substring(0, i));
    }

    let last = [""];
    for (var i = 1; i <= last_name.length; i++) {
      last.push(last_name_lower.substring(0, i));
    }

    let p1 = firestore
      .collection("users")
      .doc(uid)
      .set(userObj);

    let p2 = firestore
      .collection("indices")
      .doc(uid)
      .set({ name, fb_id, first, last });

    Promise.all([p1, p2]).then(() => resolve(true));
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
  LeaveMove,
  EndMove,
  CreateGroup,
  FetchGoingUsers,
  FetchGroupMembers,
  UserAuthenticated
};
