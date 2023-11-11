// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_DfWMiNuQ_OV4cBiD_sZokVfotyVsIqU",
  authDomain: "my-data-c0275.firebaseapp.com",
  databaseURL: "https://my-data-c0275-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-data-c0275",
  storageBucket: "my-data-c0275.appspot.com",
  messagingSenderId: "806698112381",
  appId: "1:806698112381:web:6cebefa2268b913998e814",
  measurementId: "G-VG2DPF34WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Get a reference to the database service
const database = getDatabase(app);

export { app, database };
