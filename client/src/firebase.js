import * as firebase from 'firebase'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTSik92aKEDRuFa4JPugIYxOuELhCadsQ",
  authDomain: "auth-b48d8.firebaseapp.com",
  projectId: "auth-b48d8",
  storageBucket: "auth-b48d8.appspot.com",
  messagingSenderId: "439747127653",
  appId: "1:439747127653:web:9aebb24cd3399e6f2a198c",
  measurementId: "G-6JVCXCP4QS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// exports... this allow to auth and also google account
export const auth = firebase.auth()
export const googleAuthprovider = new firebase.auth.GoogleAuthProvider();