import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // ← IMPORTAR
import { CardMainComponent } from '../../components/cards/card-main/card-main';
import { Modal } from '../../components/modal/modal';
import { SidebarComponent } from "../../components/sidebar/sidebar";


import { CardData } from './card-data.interface'


@Component({
  selector: 'app-dashbord-page',
  standalone: true,
  imports: [
    CommonModule,
    CardMainComponent,
    Modal,
    SidebarComponent
],
  templateUrl: './dashbord-page.html',
  styleUrls: ['./dashbord-page.scss']
})



export class DashbordPage {


cards: CardData[] = [
    { title: 'Higiene & Limpeza', icon: 'fa-solid fa-hand-sparkles', status: 'not-started' },
    { title: 'Alimentos', icon: 'fa-solid fa-bread-slice', status: 'partial' },
    { title: 'Cardápio', icon: 'fa-solid fa-book-open', status: 'not-started' },
    { title: 'Operação', icon: 'fa-solid fa-diagram-project', status: 'not-started' },
    { title: 'Atendimento', icon: 'fa-solid fa-bell-concierge', status: 'not-started' },
    { title: 'Estrutura', icon: 'fa-solid fa-toolbox', status: 'not-started' },
    { title: 'Equipamentos', icon: 'fa-solid fa-utensils', status: 'not-started' },
    { title: 'Verificação', icon: 'fa-solid fa-file-circle-check', status: 'not-started' },
  ];

  showModal = false;
  modalTitle: string | undefined;
  openModalFromSidebar(title: string) {
    this.modalTitle = title;
    this.showModal = true;
  }
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
