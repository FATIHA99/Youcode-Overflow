// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhKo3RX-15u6fOKGz-phes2j6IXKgayLQ",
  authDomain: "stackoverflow-ec415.firebaseapp.com",
  projectId: "stackoverflow-ec415",
  storageBucket: "stackoverflow-ec415.appspot.com",
  messagingSenderId: "223313405923",
  appId: "1:223313405923:web:b9a6bf4112721ca1aca2d6",
  measurementId: "G-96WXDTFSZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 
const analytics = getAnalytics(app); 
 const auth = getAuth();
 const provider = new GoogleAuthProvider()
export { auth, provider };