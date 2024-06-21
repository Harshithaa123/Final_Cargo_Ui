// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDBMT20zzVzcFUF35WNtw9wGMPBbbN3tBI",
  authDomain: "cargomanagemnt.firebaseapp.com",
  projectId: "cargomanagemnt",
  storageBucket: "cargomanagemnt.appspot.com",
  messagingSenderId: "135956088444",
  appId: "1:135956088444:web:01800601139e4fee44abf9",
  measurementId: "G-01LB6V3SD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);