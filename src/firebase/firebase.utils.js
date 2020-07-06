import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyC2SU9mqpVvvqidD8cIA1dmaWowbjR6KMI",
    authDomain: "crwn-db-67c63.firebaseapp.com",
    databaseURL: "https://crwn-db-67c63.firebaseio.com",
    projectId: "crwn-db-67c63",
    storageBucket: "crwn-db-67c63.appspot.com",
    messagingSenderId: "428212886850",
    appId: "1:428212886850:web:6b10727b1a18e2ef527cdb",
    measurementId: "G-0FM9V7NM9W"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch(error) {
            console.log("error creating user", error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;