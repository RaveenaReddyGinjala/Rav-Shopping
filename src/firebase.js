// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHdeK5cC6cJ6L7ZN1MUXPR-cJisD3Apbs",
  authDomain: "rangeravbyraveena.firebaseapp.com",
  projectId: "rangeravbyraveena",
  storageBucket: "rangeravbyraveena.appspot.com",
  messagingSenderId: "78326373273",
  appId: "1:78326373273:web:eb938e54d98448523f9108",
  measurementId: "G-42RSK26CK2",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
