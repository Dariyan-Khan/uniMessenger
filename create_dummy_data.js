
import { doc, setDoc, getDoc } from "firebase/firestore";
import { faker } from '@faker-js/faker';

import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword} from "firebase/auth"; //Might not need this anymore
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initializeAuth} from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyCtL8bjzJpOx6UchkIfe0ToSoqxG2Y_PRQ",
    authDomain: "uni-messenger-app.firebaseapp.com",
    projectId: "uni-messenger-app",
    storageBucket: "uni-messenger-app.appspot.com",
    messagingSenderId: "322475104254",
    appId: "1:322475104254:web:d15729e10c217e097312af",
    measurementId: "G-5YYB6BJFKV"
  };
  
const hobbies = [
    "Gardening",
    "Photography",
    "Knitting",
    "Astronomy",
    "Cooking",
    "Hiking",
    "Woodworking",
    "Orchestra",
    "Writing",
    "Bird Watching"
];

const university_subjects = [
    "Computer Science",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Biology",
    "Mechanical Engineering",
    "Electrical Engineering"
]

  // Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

const FIRESTORE_DB = getFirestore(FIREBASE_APP);

const FIREBASE_AUTH = initializeAuth(FIREBASE_APP)

const createDummyData = async () => {
    const name = faker.internet.userName();
    const email = `${name}@imperial.ac.uk`;
    const password = "Password";
    const selectedUni = "Imperial College London";

    try{
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password).then((userCredential) => {
            const user_data = {
                _id: userCredential?.user.uid,
                userName: faker.internet.userName(),
                uni: selectedUni.trim(),
                providerData: userCredential.user.providerData[0],
                subject: faker.helpers.arrayElement(university_subjects),
                year: faker.helpers.arrayElement([1,2,3,4]),
                interests: faker.helpers.shuffle(hobbies).slice(0,3),
                firstLogin: true
            };

            setDoc(doc(FIRESTORE_DB, "users", userCredential?.user.uid), user_data).then(
                () => {
                    console.log('user data created')
                }
            )
            
        });

    } catch (error) {
        console.log(error);
        console.log('sign up failed')
        console.log('success')
    } finally {
        console.log('ended')
    }
}


const createUsers = async (numUsers) => {

    for (let i = 0; i < numUsers; i++) {
        await createDummyData();
    };
}
