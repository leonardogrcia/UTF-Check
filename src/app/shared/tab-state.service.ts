import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // acessível globalmente
})
export class TabStateService {
  // guarda o texto atual da aba
  private tabTextSource = new BehaviorSubject<string>('');
  currentTabText$ = this.tabTextSource.asObservable();

  setTabText(text: string) {
    this.tabTextSource.next(text);
  }
}
