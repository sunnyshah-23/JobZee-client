
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAFZoB2kHCIJ2j5jxJVi7jJbuZ2hEv13XE",
  authDomain: "job-seeker-65159.firebaseapp.com",
  projectId: "job-seeker-65159",
  storageBucket: "job-seeker-65159.appspot.com",
  messagingSenderId: "689402638513",
  appId: "1:689402638513:web:5ec3765e309af32e71b290",
  measurementId: "G-8Y2M8FK4WZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb=getStorage(app);