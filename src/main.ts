import { bootstrapApplication } from '@angular/platform-browser';
import { appConfigComponent } from './app/app.config.component';
import { App } from './app/app';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: import.meta.env.NG_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.NG_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.NG_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.NG_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.NG_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.NG_APP_FIREBASE_MEASUREMENT_ID,
};

bootstrapApplication(App, {
  ...appConfigComponent,
  providers: [
    ...(appConfigComponent.providers ?? []),
    provideRouter(routes)
  ]
})
.catch(err => console.error(err));
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);