// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzn58a9kIpOyFqVWwYgBTx1qw-G9va4cg",
  authDomain: "appfarebase2.firebaseapp.com",
  projectId: "appfarebase2",
  storageBucket: "appfarebase2.appspot.com",
  messagingSenderId: "1042753503545",
  appId: "1:1042753503545:web:5862ecf6ef21317760e8e8",
  measurementId: "G-6KCBJ8188W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
