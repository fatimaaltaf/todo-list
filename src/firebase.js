import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagerSendersId: '',
  apiId: ''
}) // Pass object into it and API Key

export { firebaseConfig as firebase };