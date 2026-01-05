// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5SVfLxsIRPSkC5V3Cy7tfRFMlifsldJw",
  authDomain: "fir-email-password-auth-ae2f0.firebaseapp.com",
  projectId: "fir-email-password-auth-ae2f0",
  storageBucket: "fir-email-password-auth-ae2f0.firebasestorage.app",
  messagingSenderId: "358256584664",
  appId: "1:358256584664:web:fd8969686cf70168adf4ad"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);