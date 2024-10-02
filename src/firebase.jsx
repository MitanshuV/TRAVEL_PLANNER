import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTP0bS5Z7jvO04SOqXo6pumse6aQclo4w",
  authDomain: "travel-api-39367.firebaseapp.com",
  projectId: "travel-api-39367",
  storageBucket: "travel-api-39367.appspot.com",
  messagingSenderId: "63345511133",
  appId: "1:63345511133:web:c22d50b1919137756fe934",
  measurementId: "G-HHEZS27B5B",
};

// Initialize Firebase and its services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore instance
export { db };
