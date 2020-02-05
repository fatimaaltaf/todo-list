import firebase from 'firebase/app';
import 'firebase/firestore'; 


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDkMUIerbfyqugPL2I3HSu9fZsk907WWtE",
  authDomain: "to-do-list-a8be1.firebaseapp.com",
  databaseURL: "https://to-do-list-a8be1.firebaseio.com",
  projectId: "to-do-list-a8be1",
  storageBucket: "to-do-list-a8be1.appspot.com",
  messagingSenderId: "1055763226826",
  appId: "1:1055763226826:web:2ddf9db54d268239f55433"
}) // Pass object into it and API Key

export { firebaseConfig as firebase };