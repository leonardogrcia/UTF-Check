import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // ← IMPORTAR
import { CardMainComponent } from '../../components/cards/card-main/card-main';
import { Modal } from '../../components/modal/modal';
import { Sidebar } from "../../components/sidebar/sidebar";


@Component({
  selector: 'app-dashbord-page',
  standalone: true,
  imports: [
    CommonModule,
    CardMainComponent,
    Modal,
    Sidebar
],
  templateUrl: './dashbord-page.html',
  styleUrls: ['./dashbord-page.scss']
})
export class DashbordPage {

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
