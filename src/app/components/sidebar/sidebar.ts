import { Component, EventEmitter, Output } from '@angular/core';
import { Tab } from './tab/tab';
import { RouterModule } from '@angular/router';

interface SidebarItem {
  text: string;
  link?: string;
  isModal: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  imports: [Tab, RouterModule]
})
export class SidebarComponent {
  @Output() sidebarClick = new EventEmitter<string>();

  sidebarItems: SidebarItem[] = [
    { text: 'Geral', link: '/dashbord', isModal: false },
    { text: 'Perfil', link: '/profile', isModal: false },
    { text: 'Higiene & Limpeza', isModal: true },
    { text: 'Alimentos e Cardapio', isModal: true },
    { text: 'Operacao & Atendimento', isModal: true },
    { text: 'Estrutura & Equipamentos', isModal: true },
    { text: 'Verificacao', isModal: true },
  ];

  openModalFromSidebar(text: string): void {
    this.sidebarClick.emit(text);
  }
}
