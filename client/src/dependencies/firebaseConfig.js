import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD4qlg2oH5Nq8gcc8-b8tk0BlbqC9tYA4w",
  authDomain: "react-movie-app-c3cc2.firebaseapp.com",
  projectId: "react-movie-app-c3cc2",
  storageBucket: "react-movie-app-c3cc2.appspot.com",
  messagingSenderId: "914592331836",
  appId: "1:914592331836:web:53f0baef613dcdebd02b39",
  measurementId: "G-2JR7037F5R",
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);