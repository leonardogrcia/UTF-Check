import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
})
export class App {
  title = signal('UTF-Check');
  password = '';
  username = '';
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
