// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics"; // Optional

// Your web app's Firebase configuration read from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;
// let analytics; // Optional

// Check if all required config values are present
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  console.error(`Firebase config is missing keys: ${missingKeys.join(', ')}. Make sure VITE_ environment variables are set.`);
  // You might want to handle this case more gracefully in your UI
} else {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    // if (firebaseConfig.measurementId) { // Initialize Analytics only if ID is present
    //   analytics = getAnalytics(app);
    // }
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    // Handle initialization error
  }
}


// Export services
export { app, auth, db, storage }; // Export possibly uninitialized services, handle checks in consuming code if needed
