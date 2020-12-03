import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCK_fjPawmcYGO73RRxqjht03a63UlNeJk",
    authDomain: "i-clothing-db.firebaseapp.com",
    databaseURL: "https://i-clothing-db.firebaseio.com",
    projectId: "i-clothing-db",
    storageBucket: "i-clothing-db.appspot.com",
    messagingSenderId: "701888248180",
    appId: "1:701888248180:web:132d7d7957df76fa659421",
    measurementId: "G-4SK7DDQLBH"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date ();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef
  };

  
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;