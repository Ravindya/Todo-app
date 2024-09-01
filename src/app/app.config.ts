import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ng-firebase-todo-list-app","appId":"1:625390672697:web:3c8ee72a111f1e28bb26e8","storageBucket":"ng-firebase-todo-list-app.appspot.com","apiKey":"AIzaSyA8fe3jjSQ6EZ5sasq1GgxseULvmXLxZC4","authDomain":"ng-firebase-todo-list-app.firebaseapp.com","messagingSenderId":"625390672697"})), provideAuth(() => getAuth()),provideFirestore(()=>getFirestore()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })]
};
