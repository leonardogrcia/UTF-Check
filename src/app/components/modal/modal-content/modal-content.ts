import { Component, Input } from '@angular/core';
import { ValidationModalComponent } from './validation-checkboxes/validation-checkboxes';

@Component({
  selector: 'app-modal-content',
  imports: [ValidationModalComponent],
  templateUrl: './modal-content.html',
  styleUrl: './modal-content.scss',
})
export class ModalContent {
  @Input() title = '';
  percentage = '0%';

  // método chamado quando o filho emitir a nova porcentagem
  updatePercentage(value: number) {
    this.percentage = `${value}%`;
  }
}
