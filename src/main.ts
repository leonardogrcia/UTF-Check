import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp as angularInitializeApp } from '@angular/fire/app';
import { provideAuth, getAuth as angularGetAuth } from '@angular/fire/auth';

import { App } from './app/app';
import { routes } from './app/app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyC_-i8sgUc9OcgZqdrqak52GkwGOU_P_k4",
  authDomain: "utfcheckapi.firebaseapp.com",
  databaseURL: "https://utfcheckapi-default-rtdb.firebaseio.com",
  projectId: "utfcheckapi",
  storageBucket: "utfcheckapi.firebasestorage.app",
  messagingSenderId: "764300684295",
  appId: "1:764300684295:web:9f567fe670d69ebb22cea2",
  measurementId: "G-5ZLCJT39LC"
};

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => angularInitializeApp(firebaseConfig)),
    provideAuth(() => angularGetAuth())
  ]
});
