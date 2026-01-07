// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDle9citgM5ZxWVRlKNgtdadhM1uZPRo5M",
  authDomain: "class-routine-e25d1.firebaseapp.com",
  projectId: "class-routine-e25d1",
  storageBucket: "class-routine-e25d1.firebasestorage.app",
  messagingSenderId: "685567718152",
  appId: "1:685567718152:web:0468d24c9d022b7c59f2bd",
  measurementId: "G-QY1MJ4J8GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);