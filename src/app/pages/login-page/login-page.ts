import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppInputComponent } from "../../components/input/input";
import { AppButtonComponent } from "../../components/buttons/button/button";
import { AlertModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
  imports: [AppInputComponent, AppButtonComponent, AlertModule , CommonModule],
})
export class LoginPage {
  username = '';
  password = '';
  loginError = '';

  constructor(private authService: AuthService) {}

  async onLogin() {
    this.loginError = '';
    try {
      await this.authService.login(this.username, this.password);
    } catch (err: any) {
      // Mapeia erro do Firebase para mensagem amigável
      alert( err.code);
    }
  }
}
