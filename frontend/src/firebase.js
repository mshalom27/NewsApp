// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webnews-9f5b3.firebaseapp.com",
  projectId: "webnews-9f5b3",
  storageBucket: "webnews-9f5b3.firebasestorage.app",
  messagingSenderId: "918814225989",
  appId: "1:918814225989:web:befc285a5efd12a72ad52c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);