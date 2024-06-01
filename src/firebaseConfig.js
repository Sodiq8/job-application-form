// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBsNw9lfnsad_RHrmoqptZ6wzmQapDU1w4",
    authDomain: "job-application-48d50.firebaseapp.com",
    projectId: "job-application-48d50",
    storageBucket: "job-application-48d50.appspot.com",
    messagingSenderId: "412369063718",
    appId: "1:412369063718:web:47195ee28987d190b03be7",
  measurementId: "YOUR_MEASUREMENT_ID",
  databaseURL: "https://console.firebase.google.com/project/job-application-48d50/storage/job-application-48d50.appspot.com/files"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Get a reference to the storage service
const storage = getStorage(app);

export { database, storage };