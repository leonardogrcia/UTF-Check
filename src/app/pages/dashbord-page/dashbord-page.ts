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
  { id: 'higiene_limpeza', title: 'Higiene & Limpeza', icon: 'fa-solid fa-hand-sparkles', status: 'done' },
  { id: 'alimentos_cardapio', title: 'alimentos_cardapio', icon: 'fa-solid fa-book-open', status: 'partial' },
  { id: 'operacao_atendimento', title: 'operacao_atendimento', icon: 'fa-solid fa-bell-concierge', status: 'not-started' },
  { id: 'estrutura_equipamentos', title: 'estrutura_equipamentos', icon: 'fa-solid fa-utensils', status: 'not-started' },
  { id: 'verificacao', title: 'Verificação', icon: 'fa-solid fa-file-circle-check', status: 'not-started' },
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
