import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class AppButtonComponent {
  @Input() label: string = 'Enviar';
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
}
