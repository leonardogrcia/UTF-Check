import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { DashbordPage } from './pages/dashbord-page/dashbord-page';
import { ProfileComponent } from './pages/profile-page/profile-page';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  { path: 'login', component: LoginPage, },
  { path: 'dashbord', component: DashbordPage },
  { path: 'profile', component: ProfileComponent,},
  
];