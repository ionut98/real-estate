// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'realm-estate.firebaseapp.com',
  projectId: 'realm-estate',
  storageBucket: 'realm-estate.appspot.com',
  messagingSenderId: '61329846239',
  appId: '1:61329846239:web:14041de979e5f5732fde6a',
  measurementId: 'G-2HSZY869MB',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
