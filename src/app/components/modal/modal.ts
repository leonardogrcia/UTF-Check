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
  @Input() items: { name: string; checked?: boolean }[] = [];
  @Input() loading = false;
  @Input() uploading = false;
  @Input() attachments: { url: string; name: string }[] = [];

  @Output() closeModal = new EventEmitter<void>();
  @Output() progressChange = new EventEmitter<{ percentage: number; selected: number; total: number }>();
  @Output() fileSelected = new EventEmitter<File>();

  close() {
    this.closeModal.emit();
  }

  handleProgress(event: { percentage: number; selected: number; total: number }) {
    this.progressChange.emit(event);
  }

  handleFileSelected(file: File) {
    this.fileSelected.emit(file);
  }
}
