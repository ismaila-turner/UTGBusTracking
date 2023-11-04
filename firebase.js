import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,sendPasswordResetEmail,EmailAuthProvider } from 'firebase/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import 'firebase/firestore';
import { getFirestore ,addDoc,collection} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useContext } from 'react';

const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "AIzaSyBn4dN2LqHTEqMivhKoFR6orrvdZottX_Y",
  authDomain: "driversbustracker.firebaseapp.com",
  projectId: "driversbustracker",
  storageBucket: "driversbustracker.appspot.com",
  messagingSenderId: "710645626633",
  appId: "1:710645626633:web:7a228738a5f747a2d685d8",
  measurementId: "G-LZXYBFR4T3"



};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
firebase.initializeApp({
  apiKey: "AIzaSyBn4dN2LqHTEqMivhKoFR6orrvdZottX_Y",
  authDomain: "driversbustracker.firebaseapp.com",
  projectId: "driversbustracker",
  storageBucket: "driversbustracker.appspot.com",
  messagingSenderId: "710645626633",
  appId: "1:710645626633:web:7a228738a5f747a2d685d8",
  measurementId: "G-LZXYBFR4T3"


});

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(); 

const user = auth.currentUser;
 export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail ,db,storage, user,EmailAuthProvider };
//   }export default firebase;