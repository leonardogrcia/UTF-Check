
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp as angularInitializeApp } from '@angular/fire/app';
import { provideAuth, getAuth as angularGetAuth } from '@angular/fire/auth';

import { App } from './app/app';
import { routes } from './app/app.routes';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_-i8sgUc9OcgZqdrqak52GkwGOU_P_k4",
  authDomain: "utfcheckapi.firebaseapp.com",
  databaseURL: "https://utfcheckapi-default-rtdb.firebaseio.com",
  projectId: "utfcheckapi",
  storageBucket: "utfcheckapi.firebasestorage.app",
  messagingSenderId: "764300684295",
  appId: "1:764300684295:web:5499379d6ce955a722cea2",
  measurementId: "G-BE13YFGE07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => angularInitializeApp(firebaseConfig)),
    provideAuth(() => angularGetAuth())
  ]
});
