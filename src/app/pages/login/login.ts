import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AppInputComponent } from "../../components/input/input";
import { AppButtonComponent } from "../../components/buttons/button/button";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [AppInputComponent, AppButtonComponent]
})
export class Login {

  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  async login() {
    const isValid = await this.auth.login(this.username, this.password);

    if (isValid) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Usuário ou senha inválidos');
    }
  }

}
