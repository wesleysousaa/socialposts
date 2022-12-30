import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBUE9RQDG2Oif7ngwHNRi55gYuofQoq_9w",
  authDomain: "socialposts-cb0b3.firebaseapp.com",
  projectId: "socialposts-cb0b3",
  storageBucket: "socialposts-cb0b3.appspot.com",
  messagingSenderId: "1061085001178",
  appId: "1:1061085001178:web:619dcc0111e42864aa3ce3"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)