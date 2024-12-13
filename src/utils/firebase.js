// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEp5wflxYL4854H-Y8hnyMXAujEVsHULc",
  authDomain: "netflixgpt-62645.firebaseapp.com",
  projectId: "netflixgpt-62645",
  storageBucket: "netflixgpt-62645.firebasestorage.app",
  messagingSenderId: "730001282495",
  appId: "1:730001282495:web:90b4db2363b2000493bd0a",
  measurementId: "G-T87WFTQZZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();   