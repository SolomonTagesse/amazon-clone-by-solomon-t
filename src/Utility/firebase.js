// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCre4tBhgnAbk0zCGaPwPo7BCWj7KeOSHc",
  authDomain: "e-clone-by-solomon.firebaseapp.com",
  projectId: "e-clone-by-solomon",
  storageBucket: "e-clone-by-solomon.appspot.com",
  messagingSenderId: "710165431599",
  appId: "1:710165431599:web:b7157fbd76acbb54af0dda",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
