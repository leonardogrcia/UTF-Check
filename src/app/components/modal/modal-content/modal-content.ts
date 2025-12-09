import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationModalComponent } from './validation-checkboxes/validation-checkboxes';

@Component({
  selector: 'app-modal-content',
  imports: [ValidationModalComponent],
  templateUrl: './modal-content.html',
  styleUrl: './modal-content.scss',
})
export class ModalContent {
  @Input() title = '';
  @Input() items: { name: string; checked?: boolean }[] = [];
  @Input() attachments: { url: string; name: string }[] = [];
  @Input() loading = false;
  percentage = '0%';

  @Output() progressChange = new EventEmitter<{ percentage: number; selected: number; total: number }>();

  updatePercentage(event: { percentage: number; selected: number; total: number }) {
    this.percentage = `${event.percentage}%`;
    this.progressChange.emit(event);
  }
}
