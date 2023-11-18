// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADs2HyLKLNblb6N8zJ2VCCp49f4hudUb0",
  authDomain: "mern-stack-project-428be.firebaseapp.com",
  projectId: "mern-stack-project-428be",
  storageBucket: "mern-stack-project-428be.appspot.com",
  messagingSenderId: "613807846318",
  appId: "1:613807846318:web:4cea8dd272f6a7fab20e3f",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storages = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
