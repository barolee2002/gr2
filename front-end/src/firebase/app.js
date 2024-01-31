// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqWXwffCrwVzpoO3SnL00966AtJ1m9LJs",
  authDomain: "gr2prj.firebaseapp.com",
  projectId: "gr2prj",
  storageBucket: "gr2prj.appspot.com",
  messagingSenderId: "1046754004654",
  appId: "1:1046754004654:web:f5566f730ad7fb850fe73f",
  measurementId: "G-ZN5EDKB2HN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;