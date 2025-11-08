import { Routes } from '@angular/router';
import { GeneralPage } from './pages/general-page/general-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { Login } from './pages/login/login';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
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
