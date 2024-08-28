// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA-W1WhdaPjb8v6U3q3H2eWaYR2TydHLU",
  authDomain: "buyticket-e2f6e.firebaseapp.com",
  projectId: "buyticket-e2f6e",
  storageBucket: "buyticket-e2f6e.appspot.com",
  messagingSenderId: "41013132676",
  appId: "1:41013132676:web:0b73718a80136beeae71d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
