import { Routes } from '@angular/router';
import { GeneralPage } from './pages/general-page/general-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { StartingPage } from './pages/starting-page/starting-page';

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
