import { Routes } from '@angular/router';
import { ProfilePage } from './pages/profile-page/profile-page';
import { LoginPage } from './pages/login-page/login-page';
import { DashbordPage } from './pages/dashbord-page/dashbord-page';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'dashbord',
    component: DashbordPage
  },
  {
    path: 'profile',
    component: ProfilePage,
  },
  
];