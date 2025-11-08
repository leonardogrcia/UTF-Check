import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// --- Imports de todas as suas versões ---
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
// Corrigi o nome do import com base no seu uso (estava 'CardMain')
import { CardMainComponent } from './components/cards/card-main/card-main'; 
import { AppButtonComponent } from "./components/buttons/button/button";
import { AppInputComponent } from "./components/input/input";
import { Modal } from './components/modal /modal';
import { Card } from './components/card/card';

// 1. APENAS UM decorador @Component
@Component({
  selector: 'app-root',
  standalone: true, // Componentes com 'imports' são standalone
  
  // 2. Array de 'imports' COMBINADO com todos os itens
  imports: [
    RouterOutlet,
    CardMainComponent,
    AppInputComponent,
    AppButtonComponent
],
  
  templateUrl: './app.component.html', 
  styleUrl: './app.component.scss',
})

export class App { 

  protected readonly title = signal('UTF-Check');
  password: any;
  username: any;
  isModalVisible = false;
  modalTitle = '';

  openModal(content: string) {
    this.modalTitle = content;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}