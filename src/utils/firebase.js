// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5u9mkJ8PpKPkap_fXbOeoVi9bEbAmugs",
  authDomain: "netflix-e4567.firebaseapp.com",
  projectId: "netflix-e4567",
  storageBucket: "netflix-e4567.appspot.com",
  messagingSenderId: "762036343896",
  appId: "1:762036343896:web:6317756154cd7e41bc262d",
  measurementId: "G-J0JJZ0KZQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
