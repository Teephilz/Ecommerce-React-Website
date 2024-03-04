// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBpgfmvoMcQtXbeE4kYwIY8uZQ_7slXtkc",
  authDomain: "ecomm-react-fb057.firebaseapp.com",
  projectId: "ecomm-react-fb057",
  storageBucket: "ecomm-react-fb057.appspot.com",
  messagingSenderId: "250489897593",
  appId: "1:250489897593:web:fa74ffed520f5217fe0aa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage= getStorage(app);
export {fireDB, auth, storage}