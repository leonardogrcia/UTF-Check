import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  imports: [],
  templateUrl: './modal-header.html',
  styleUrl: './modal-header.scss',
})
export class ModalHeader {
  @Input() title = '';

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
