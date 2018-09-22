import { Platform } from "react-native";
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { Navigation } from "react-native-navigation";
import Contacts from "react-native-contacts";
import { formatNumber, parseNumber } from "libphonenumber-js";
import firebase from "react-native-firebase";
import RNFS from "react-native-fs";

let firestore = firebase.firestore();

//////////////* GRAPH API *//////////////
export const FetchFriendsList = ({ fb_id }) => {
  return new Promise((resolve, reject) => {
    const friendListRequest = new GraphRequest(`/${fb_id}/friendlists`, null, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });

    new GraphRequestManager().addRequest(friendListRequest).start();
  });
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
  return new Promise(async (resolve, reject) => {
    // let numbers = await getContactNumbers();
    let numbers = ["2069409629", "8885555512"];
    let ref = firestore.collection("users");

    // ref
    //   .where("phone_number", "==", "2069409629")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       console.log(doc.data());
    //     });
    //   });

    firestore
      .runTransaction(transaction => {
        return new Promise(resolve => {
          let promises = [];
          numbers.forEach(number => {
            const query = ref.where("phone_number", "==", number);
            promises.push(transaction.get(query));
          });

          // let promises = [
          //   transaction.get(ref.doc("1")),
          //   transaction.get(ref.doc("2IffV1qVHxbluztcA9w9mq1xQfK2"))
          // ];

          let matches = [];
          Promise.all(promises).then(results => {
            console.log("results: ", results);
            results.forEach(querySnapshot => {
              console.log("querySnapshot: ", querySnapshot);
              querySnapshot.forEach(doc => {
                const { uid, fb_id, name } = doc.data();
                matches.push({ uid, fb_id, name });
              });
            });
            resolve(matches);
          });
        });
      })
      .then(results => {
        console.log(matches);
        resolve(results);
      })
      .catch(error => console.error(error));
  });
};

const contactTransaction = async transaction => {
  let numbers = await getContactNumbers();

  let ref = firestore.collection("users");
  let promises = [];
  numbers.forEach(number => {
    console.log(number);
    // promises.push(transaction.get(ref.where("phone_number", "==", number)));
    // promises.push(transaction.get(ref.doc("1")));
  });
  promises.push(transaction.get(ref.doc("1")));

  let matches = [];
  Promise.all(promises).then(results => {
    results.forEach(doc => {
      const { uid, fb_id, name } = doc.data();
      matches.push({ uid, fb_id, name });
    });
    console.log(matches);
    return matches;
  });
};

const getContactNumbers = () => {
  return new Promise((resolve, reject) => {
    Contacts.getAll((err, contacts) => {
      if (err) throw reject(err);

      let numbers = [];
      contacts.forEach(({ phoneNumbers }) => {
        let number = parseNumber(phoneNumbers[0].number, "US").phone;
        numbers.push(number);
      });
      resolve(numbers);
    });
  });
};

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
    let query = firestore
      .collection("indices")
      .where("first", "array-contains", first.toLowerCase());
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

    // console.log(group_id);

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

export const AcceptFriend = ({ user, uid }) => {
  return new Promise((resolve, reject) => {
    firestore
      .runTransaction(async transaction => {
        console.log("user: ", user, uid);
        const users = firestore.collection("users");
        const receivedRef = users
          .doc(user.uid)
          .collection("received_friend_requests")
          .doc(uid);
        const sentRef = users
          .doc(uid)
          .collection("sent_friend_requests")
          .doc(user.uid);
        const newFriendRef1 = users
          .doc(user.uid)
          .collection("friends")
          .doc(uid);
        const newFriendRef2 = users
          .doc(uid)
          .collection("friends")
          .doc(user.uid);

        const newFriendDoc = await transaction.get(receivedRef);
        const newFriendData = newFriendDoc.data();

        let p1 = transaction.set(newFriendRef1, { ...newFriendData });
        let p2 = transaction.set(newFriendRef2, {
          name: user.name,
          uid: user.uid,
          fb_id: user.fb_id
        });
        let p3 = transaction.delete(receivedRef);
        let p4 = transaction.delete(sentRef);

        Promise.all([p1, p2, p3, p4]).then(() => {
          return true;
        });
      })
      .then(() => resolve(true))
      .catch(error => console.error(error));
  });
};

export const DeleteRequest = ({ user, uid }) => {
  return new Promise((resolve, reject) => {
    firestore
      .runTransaction(async transaction => {
        const users = firestore.collection("users");
        const receivedRef = users
          .doc(user.uid)
          .collection("received_friend_requests")
          .doc(uid);
        const sentRef = users
          .doc(uid)
          .collection("sent_friend_requests")
          .doc(user.uid);

        let p1 = transaction.delete(receivedRef);
        let p2 = transaction.delete(sentRef);

        Promise.all([p1, p2]).then(() => {
          return true;
        });
      })
      .then(() => resolve(true))
      .catch(error => console.error(error));
  });
};

export const DeleteFriend = uid => {};

/* GROUPS */
export const CreateGroup = ({ group_name, user, members }) => {
  return new Promise(resolve => {
    const { uid, name, fb_id } = user;
    const group = {
      name: group_name,
      created_by: uid,
      created_at: Date.now()
      // size: members.length
    };

    firestore
      .collection("groups")
      .add(group)
      .then(docRef => {
        let ref = docRef.collection("members");
        let users_ref = firestore.collection("users");

        let batch = firestore.batch();
        members.forEach(member => {
          batch.set(
            users_ref
              .doc(member.uid)
              .collection("groups")
              .doc(docRef.id),
            {
              id: docRef.id
            }
          );

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

export const ChangeGroupName = ({ group_id, group_name }) => {
  return new Promise((resolve, reject) => {
    const groupRef = firestore.collection("groups").doc(group_id);
    groupRef.set({ name: group_name }, { merge: true }).then(() => resolve(true));
  });
};

export const LeaveGroup = group => {};

//////////////* AUTH *//////////////
// export const AuthWithPhone = phoneNumber => {
//   firebase
//     .auth()
//     .signInWithPhoneNumber(phoneNumber)
//     .then(confirmResult => {})
//     .catch(error => error);
// };

// export const VerifyPhone = code => {
//   confirmResult
//     .confirm(verificationCode)
//     .then(user => {
//       // User is logged in
//     })
//     .catch(error => {
//       // Error with verification code
//     });
// };

export const SetUserPhone = (phone, uid) => {
  return new Promise(resolve => {
    firestore
      .collection("users")
      .doc(uid)
      .set({ phone_number: phone }, { merge: true })
      .then(() => resolve(true));
  });
};

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

export const UpdateUser = ({ uid, fcmToken }) => {
  return new Promise(resolve => {
    firestore
      .collection("users")
      .doc(uid)
      .set({ fcm_token: fcmToken }, { merge: true })
      .then(() => resolve(true));
  });
};

export const FacebookLogout = async () => {
  return new Promise(resolve => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Navigation.dismissAllModals();
        setTimeout(() => Navigation.popToRoot("Component3"), 500);
        resolve(true);
      });
  });
};

export default {
  UpdateUser,
  AcceptFriend,
  DeleteRequest,
  SendMove,
  JoinMove,
  LeaveMove,
  EndMove,
  CreateGroup,
  ChangeGroupName,
  FetchGoingUsers,
  FetchGroupMembers,
  UserAuthenticated
};
