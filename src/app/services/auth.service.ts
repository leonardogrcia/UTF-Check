import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Usuário logado:', userCredential.user);
      this.router.navigate(['/dashbord']);
    } catch (error: any) {
      console.error('Erro ao logar:', error.code);
      throw error;
    }
  }
}
