import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalHeader } from './modal-header/modal-header';
import { ModalContent } from './modal-content/modal-content';
import { ModalFooter } from './modal-footer/modal-footer';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ModalHeader, ModalContent, ModalFooter],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
})
export class Modal {
  @Input() modalTitle = '';

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
