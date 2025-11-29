import { Component, EventEmitter, Output } from '@angular/core';
import { Tab } from "./tab/tab";
import { RouterModule } from "@angular/router";

interface SidebarItem {
  text: string;
  link?: string; // RouterLink opcional para navegação
  isModal: boolean; // Indica se o item deve abrir o modal
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  imports: [Tab, RouterModule]
})
export class SidebarComponent {
  // Event Emitter para enviar o evento de clique da sidebar para o componente pai
  @Output() sidebarClick = new EventEmitter<string>();

  // Lista de itens da sidebar
  sidebarItems: SidebarItem[] = [
    // Itens Fixos de Navegação
    { text: 'Geral', link: '/dashbord', isModal: false },
    { text: 'Perfil', link: '/profile', isModal: false },

    // Itens que abrem o Modal
    { text: 'Higiene & Limpeza', isModal: true },
    { text: 'Alimentos', isModal: true },
    { text: 'Cardápio', isModal: true },
    { text: 'Operação', isModal: true },
    { text: 'Atendimento', isModal: true },
    { text: 'Estrutura', isModal: true },
    { text: 'Equipamentos', isModal: true },
    { text: 'Verificação', isModal: true },
  ];

  openModalFromSidebar(text: string): void {
    // Emite o texto do item clicado para o componente pai
    this.sidebarClick.emit(text);
  }
}