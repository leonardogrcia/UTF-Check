import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Modal } from './components/modal /modal';
import { Card } from './components/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal, Card],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('UTF-Check');
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
