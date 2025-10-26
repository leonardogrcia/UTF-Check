import { Routes } from '@angular/router';
import { GeneralPage } from './components/pages/general-page/general-page';
import { ProfilePage } from './components/pages/profile-page/profile-page';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full',
  },
  {
    path: 'general',
    component: GeneralPage,
  },
  {
    path: 'profile',
    component: ProfilePage,
  },
];
