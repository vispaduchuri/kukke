const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');
require('firebase/firestore');

let config = {};

//  Production
config = {

};
 
 config = {
    apiKey: "AIzaSyCP75a_aqC2LcoWcWb-S6iDYW7hRURNS0E",
    authDomain: "prodet-ku.firebaseapp.com",
    databaseURL: "https://prodet-ku.firebaseio.com",
    projectId: "prodet-ku",
    storageBucket: "prodet-ku.appspot.com",
    messagingSenderId: "120522480593",
    appId: "1:120522480593:web:ea1b6d59d3079d89"
  };
firebase.initializeApp(config);
// const firestore = firebase.firestore();
// firestore.settings({

// });
export default firebase;