// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";


import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZ00PJdjxu0O2shWXwKSHCvenOLLpuQTI",
  authDomain: "fitform-e7509.firebaseapp.com",
  projectId: "fitform-e7509",
  storageBucket: "fitform-e7509.appspot.com",
  messagingSenderId: "1014611246092",
  appId: "1:1014611246092:web:b78a126700b6d0d387c229"
 
};

// Initialize Firebase


const app =  initializeApp(firebaseConfig);
export const auth = getAuth(app);



export default app;