import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  imports: [],
  templateUrl: './modal-footer.html',
  styleUrl: './modal-footer.scss',
})
export class ModalFooter {
  @Input() area = 'cozinha';
}
