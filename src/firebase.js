import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgUVJ5tOYt6J0FBL8raOyUtISYF_SXENw",
  authDomain: "podcast-platform-f8eeb.firebaseapp.com",
  projectId: "podcast-platform-f8eeb",
  storageBucket: "podcast-platform-f8eeb.appspot.com",
  messagingSenderId: "404246101800",
  appId: "1:404246101800:web:dc2af99a0197b4887c5a1d",
  measurementId: "G-N8LQRX47H8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth,db,storage};
