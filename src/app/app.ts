import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@coreui/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    AlertModule
    
  ],
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
