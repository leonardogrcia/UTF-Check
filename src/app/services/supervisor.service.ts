import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Supervisor } from '../pages/profile-page/interface.supervisor';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  private supervisorData: Supervisor = {
    id: 1,
    nome: 'Professor Roni',
    email: 'supervisor@utfcheck.com',
    campus: 'UTFPR — Guarapuava',
    departamento: 'Restaurante Universitário',
    avatarUrl: 'https://ui-avatars.com/api/?name=Supervisor+RU&background=3b82f6&color=fff&size=256',
    avaliacao: 5,
    itens_verificados: 12,
    ocorrencias: 3
  };

  getSupervisor(): Observable<Supervisor> {
    return of(this.supervisorData);
  }
}
