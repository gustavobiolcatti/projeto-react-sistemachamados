// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoyfzyu7UR9Q6eNi8WUmaqtk8r-jxnjDo",
  authDomain: "sistema-chamados-30092.firebaseapp.com",
  projectId: "sistema-chamados-30092",
  storageBucket: "sistema-chamados-30092.appspot.com",
  messagingSenderId: "687939961656",
  appId: "1:687939961656:web:50c608acf26cb05d5f77cd",
  measurementId: "G-77MB3SD4BH"
};

// Initialize Firebase

if (!initializeApp.length) {

}

const fireConnection = initializeApp.length && initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth()

export { fireConnection, db, auth }