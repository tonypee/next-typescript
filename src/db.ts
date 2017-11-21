const config = {
  apiKey: "AIzaSyBilLhz42EtQDZ4bs53-44-dg0NUdz2D9w",
  authDomain: "parcelle-e3e74.firebaseapp.com",
  databaseURL: "https://parcelle-e3e74.firebaseio.com",
  projectId: "parcelle-e3e74",
  storageBucket: "parcelle-e3e74.appspot.com",
  messagingSenderId: "522605654322"
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

