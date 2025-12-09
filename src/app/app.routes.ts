import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { DashbordPage } from './pages/dashbord-page/dashbord-page';
import { ProfileComponent } from './pages/profile-page/profile-page';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  { path: 'login', component: LoginPage, },
  { path: 'dashbord', component: DashbordPage, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  
];
