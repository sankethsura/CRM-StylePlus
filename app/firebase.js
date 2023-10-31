// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBABB3A8Ud49K5OOYzDyeJuvBPWhNZfW6E",
  authDomain: "next-auth-c4e96.firebaseapp.com",
  projectId: "next-auth-c4e96",
  storageBucket: "next-auth-c4e96.appspot.com",
  messagingSenderId: "471359691692",
  appId: "1:471359691692:web:d87393dd15ee90ffa17809"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
