// Firebase Admin SDK was initialized elsewhere, we just need access to its functions.
const firebaseAdmin = require("firebase-admin");

// Set up the Firebase Client SDK
const { firebaseConfig } = require("../../keys/firebaseClientKey");
const firebaseClient = require("firebase/app");
// Add the Firebase products that you want to use
const {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} = require("firebase/auth");
// Initialize the Firebase Client SDK
firebaseClient.initializeApp(firebaseConfig);

// ----------- Config above, functions below -------------

async function signUpUser(userDetails) {
  // Use the Firebase Admin SDK to create the user
  return firebaseAdmin
    .auth()
    .createUser({
      email: userDetails.email, // User email address.
      emailVerified: true, // Required for fuller user functionality, but a hassle to set up in a short tutorial. Set to false if you do end up configuring email verifications, as the email system will set it to true.
      password: userDetails.password, // password. You'll never see this value even as project admin.
      displayName: userDetails.displayName, // the username
      // photoURL: "", // point to an image file hosted elsewhere
      disabled: false, // if a user is banned/usable
    })
    .then(async (userRecord) => {
      // The user was created successfully, now we can update the user's profile
      await updateProfile(userRecord.uid, {
        displayName: userDetails.displayName,
      });
      // Return the user's ID
      return userRecord.uid;
    })
    .catch((error) => {
      // Handle errors
      console.log("Error creating new user:", error);
      return error;
    });
}

async function signInUser(userDetails) {
  const firebaseClientAuth = getAuth();

  let signInResult = signInWithEmailAndPassword(
    firebaseClientAuth,
    userDetails.email,
    userDetails.password
  )
    .then(async (userCredential) => {
      let userIdToken = await firebaseClientAuth.currentUser.getIdTokenResult(
        false
      );

      console.log(`userIdToken obj is\n ${JSON.stringify(userIdToken)}`);

      return {
        idToken: userIdToken.token,
        refreshToken: userCredential.user.refreshToken,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        uid: userCredential.user.uid,
      };
    })
    .catch((error) => {
      console.log("Internal signin function error is: \n" + error);
      return { error: error };
    });

  return signInResult;
}

async function validateUserSession(sessionDetails) {
  let userRefreshToken = sessionDetails.refreshToken;
  let userIdToken = sessionDetails.idToken;

  return firebaseAdmin
    .auth()
    .verifyIdToken(userIdToken, true)
    .then(async (decodedToken) => {
      console.log(`Decoded session token is ${JSON.stringify(decodedToken)}`);

      return {
        isValid: true,
        uid: decodedToken.uid,
        fullDecodedToken: decodedToken,
      };
    })
    .catch((error) => {
      if (error.code == "auth/id-token-revoked") {
        // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
        console.log(
          "You must sign in again to access this. Full error is: \n" + error
        );
      } else {
        // Token is invalid.
        console.log("Session token is invalid. Full error is: \n" + error);
      }

      return { error: error };
    });
}

async function getDisplayNameFromUID(uid) {
  return firebaseAdmin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      return userRecord.displayName;
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
      return error;
    });
}

module.exports = {
  signUpUser,
  signInUser,
  validateUserSession,
  getDisplayNameFromUID,
};
