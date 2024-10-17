// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG-F70_Jp8ix0iZTtH3iISM0glAtPxeFU",
  authDomain: "next-firebase-commerce-a6ba5.firebaseapp.com",
  projectId: "next-firebase-commerce-a6ba5",
  storageBucket: "next-firebase-commerce-a6ba5.appspot.com",
  messagingSenderId: "462904377083",
  appId: "1:462904377083:web:b03438ec0b34237fb3ba5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//fire store
const db = getFirestore(app)

// storage

// authentication

export {db}