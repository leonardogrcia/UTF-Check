import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertModule } from '@coreui/angular';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AppInputComponent } from '../../components/input/input';
import { AppButtonComponent } from '../../components/buttons/button/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
  imports: [AppInputComponent, AppButtonComponent, AlertModule, CommonModule],
})
export class LoginPage {
  username = '';
  password = '';
  loginError = '';
  loginSuccess = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  async onLogin() {
    if (this.isLoading) return;
    this.loginError = '';
    this.loginSuccess = '';
    this.isLoading = true;

    try {
      await this.authService.login(this.username, this.password);
      this.loginSuccess = 'Login realizado com sucesso. Redirecionando...';
      this.toastr.success(this.loginSuccess, 'Sucesso');
      this.isLoading = false;
      // Navegar sem bloquear a UI caso algo demore/cancele
      this.router.navigate(['/dashbord']).catch(() => {});
      return;
    } catch (err: any) {
      this.loginError = this.mapFirebaseError(err?.code);
      this.toastr.error(this.loginError, 'Erro');
    } finally {
      this.isLoading = false;
    }
  }

  private mapFirebaseError(code?: string): string {
    const messages: Record<string, string> = {
      'auth/user-not-found': 'Usuario nao encontrado.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/invalid-email': 'E-mail invalido.',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    };
    return messages[code ?? ''] || 'Nao foi possivel realizar o login. Verifique as credenciais e tente novamente.';
  }
}
