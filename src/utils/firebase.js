// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLf7iDL78dR7kjoLfMAeZK2lxDNCsetdE",
  authDomain: "netflix-clone-yrnn.firebaseapp.com",
  projectId: "netflix-clone-yrnn",
  storageBucket: "netflix-clone-yrnn.firebasestorage.app",
  messagingSenderId: "860782959216",
  appId: "1:860782959216:web:896ed38d98238afe05b2b5",
  measurementId: "G-0D41X023M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)