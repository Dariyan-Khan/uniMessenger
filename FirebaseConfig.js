// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtL8bjzJpOx6UchkIfe0ToSoqxG2Y_PRQ",
  authDomain: "uni-messenger-app.firebaseapp.com",
  projectId: "uni-messenger-app",
  storageBucket: "uni-messenger-app.appspot.com",
  messagingSenderId: "322475104254",
  appId: "1:322475104254:web:d15729e10c217e097312af",
  measurementId: "G-5YYB6BJFKV"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP)

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP,
                              {
                                persistence: getReactNativePersistence(AsyncStorage)
                              });
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//const analytics = getAnalytics(app);