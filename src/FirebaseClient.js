/* eslint-disable no-unused-vars */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA966PYyWgZIlTXUc3gNUeZmRMMi4U4RSg",
  authDomain: "jobdock-777.firebaseapp.com",
  projectId: "jobdock-777",
  storageBucket: "jobdock-777.appspot.com",
  messagingSenderId: "997016671087",
  appId: "1:997016671087:web:beda75a1aaebc9acf7ce9a",
  measurementId: "G-9ZMSSWGMTE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const userLoginDatabase = getAuth(app);

// Initialize job database
const jobDataBase = getFirestore();

export { app, userLoginDatabase, jobDataBase };
