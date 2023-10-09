// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzOyKJK-Xo-iZSpnipS8VsUbfFigww98A",
    authDomain: "mystiquemakeup-77e2c.firebaseapp.com",
    projectId: "mystiquemakeup-77e2c",
    storageBucket: "mystiquemakeup-77e2c.appspot.com",
    messagingSenderId: "118903431160",
    appId: "1:118903431160:web:5d57936dd55ff689ae400d",
    measurementId: "G-8TM80TWSKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get database from Firebase
const db = getFirestore(app);

export { db };