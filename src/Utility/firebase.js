// Import the core Firebase module and specific services
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Firebase configuration object containing keys and identifiers for your app
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app with the configuration object
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication service
const auth = getAuth(app);

// Initialize Firestore database service
const db = app.firestore();

// Export the initialized services for use in other parts of the application
export { auth, db };
