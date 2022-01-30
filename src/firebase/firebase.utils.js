import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; // firebase/auth

const config = {
  apiKey: "AIzaSyAFY6xyJADL8voknsPkFAssnXj_alsCCYY",
  authDomain: "crwn-db-65f8d.firebaseapp.com",
  databaseURL: 'https://crwn-db-65f8d.firebaseio.com',
  projectId: "crwn-db-65f8d",
  storageBucket: "crwn-db-65f8d.appspot.com",
  messagingSenderId: "789392842564",
  appId: "1:789392842564:web:3547c2c809317e38ae4111",
  measurementId: "G-VE9LQ6EJVM"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
