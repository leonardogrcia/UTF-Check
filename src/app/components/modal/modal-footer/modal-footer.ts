import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  imports: [],
  templateUrl: './modal-footer.html',
  styleUrl: './modal-footer.scss',
})
export class ModalFooter {
  @Input() area = 'cozinha';
  @Input() uploading = false;

  @Output() uploadFile = new EventEmitter<File>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      this.uploadFile.emit(file);
      input.value = '';
    }
  }
}
