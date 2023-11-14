// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRLMySST7s1RaYRRlfpaZ-duW5paTM4Bw",
  authDomain: "netflix-43b22.firebaseapp.com",
  projectId: "netflix-43b22",
  storageBucket: "netflix-43b22.appspot.com",
  messagingSenderId: "1039579639727",
  appId: "1:1039579639727:web:36d24f0b77b9ec87d0495a",
  measurementId: "G-7ETGH6C1M1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();


