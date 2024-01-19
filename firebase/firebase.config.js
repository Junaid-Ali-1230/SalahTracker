// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCofAc6ttqhX-0keWVElV_lQ03GKNRZMa4",
  authDomain: "salahtracker-b6734.firebaseapp.com",
  projectId: "salahtracker-b6734",
  storageBucket: "salahtracker-b6734.appspot.com",
  messagingSenderId: "910394888301",
  appId: "1:910394888301:web:cee61f0a308a454d26af64",
  measurementId: "G-1VP65DQCSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)