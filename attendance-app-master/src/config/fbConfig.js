import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCqKttRGg1taOjg5u7fngUSGqxtd3vKPM",
    authDomain: "anagram-c496e.firebaseapp.com",
    databaseURL: "https://anagram-c496e.firebaseio.com",
    projectId: "anagram-c496e",
    storageBucket: "",
    messagingSenderId: "653027370210"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true})

  export default firebase;