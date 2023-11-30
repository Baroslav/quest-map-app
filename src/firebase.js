import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCked7TaEA_mDxsarX4ccMaWfsF6Fi58XI",
  authDomain: "quest-9c2f0.firebaseapp.com",
  projectId: "quest-9c2f0",
  storageBucket: "quest-9c2f0.appspot.com",
  messagingSenderId: "610790262899",
  appId: "1:610790262899:web:a93e5c09e8602f37848206"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const questCollection = collection(db,"quest");



