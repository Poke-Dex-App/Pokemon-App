// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnD7B9OU9wAMgH_HzMBM5BQs8A_1m0Pfg",
  authDomain: "pokemon-app-ca105.firebaseapp.com",
  databaseURL: "https://pokemon-app-ca105-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-app-ca105",
  storageBucket: "pokemon-app-ca105.firebasestorage.app",
  messagingSenderId: "723200275677",
  appId: "1:723200275677:web:1783f11d4ed0ee68dfd734"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);