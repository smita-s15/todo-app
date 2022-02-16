// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5oYtVSjF5F1VhXDJ10fzxO2u9wjpxtkk",
  authDomain: "todo-2538b.firebaseapp.com",
  projectId: "todo-2538b",
  storageBucket: "todo-2538b.appspot.com",
  messagingSenderId: "291482634513",
  appId: "1:291482634513:web:8b63e6dab41467369264b0",
  measurementId: "G-E0LM15CV5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth= getAuth();
const provider = new GoogleAuthProvider();
export { db, auth, provider };