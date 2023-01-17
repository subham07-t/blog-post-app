import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: 'AIzaSyA1kKshiD1SiwUBDW5KdAvQIS1-Qq2I_UA',
    authDomain: "blog-post-app-eb1dc.firebaseapp.com",
    projectId: "blog-post-app-eb1dc",
    storageBucket: "blog-post-app-eb1dc.appspot.com",
    messagingSenderId: "379049789371",
    appId: "1:379049789371:web:7d7fadfd8684e0dd97669e",
    measurementId: "G-BRWN4WD3R6"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)