import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppInputComponent } from "../../components/input/input";
import { AppButtonComponent } from "../../components/buttons/button/button";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
  imports: [AppInputComponent, AppButtonComponent],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private authService: AuthService) { }

  onLogin() {
    console.log('Tentando login:', this.email, this.password);
    this.authService.login(this.email, this.password);
  }
}
