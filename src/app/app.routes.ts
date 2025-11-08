import { Routes } from '@angular/router';
import { GeneralPage } from './components/sidebar/pages/general-page/general-page';
import { ProfilePage } from './components/sidebar/pages/profile-page/profile-page';
import { StartingPage } from './components/sidebar/pages/starting-page/starting-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'starting',
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
  {
    path: 'starting',
    component: StartingPage,
  },
];
