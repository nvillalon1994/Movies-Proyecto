// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

import {getAuth} from "firebase/auth"
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2lBrw6kPRVr3bPH3YEgxXfSaFeJpvurI",
  authDomain: "auth-c0496.firebaseapp.com",
  projectId: "auth-c0496",
  storageBucket: "auth-c0496.appspot.com",
  messagingSenderId: "236697747953",
  appId: "1:236697747953:web:251cef366d4c801836c450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database= getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)