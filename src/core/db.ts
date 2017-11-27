const config = {
  apiKey: "AIzaSyCW1Y0eWj_p6pEFprEN3fzKEYU3ejaVk48",
  authDomain: "firestore-typescript-example.firebaseapp.com",
  databaseURL: "https://firestore-typescript-example.firebaseio.com",
  projectId: "firestore-typescript-example",
  storageBucket: "",
  messagingSenderId: "531206409450"
};

let firebase = require("firebase");
require("@firebase/firestore");

try {  
  firebase.initializeApp(config)
} catch (err) {
  // ignore 'already exists' errors on node for ssr
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export default firebase.firestore()

export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()