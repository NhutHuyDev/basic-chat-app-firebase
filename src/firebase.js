// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3ZKmjhur1EoPMTuhKxdEQ63ESJ7ujpJs",
    authDomain: "basic-chat-app-firebase-425d6.firebaseapp.com",
    projectId: "basic-chat-app-firebase-425d6",
    storageBucket: "basic-chat-app-firebase-425d6.appspot.com",
    messagingSenderId: "587347686274",
    appId: "1:587347686274:web:21e83d3adf9a6055c3559b"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()