import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- adiciona FormsModule
  templateUrl: './input.html',
  styleUrls: ['./input.scss']
})
export class AppInputComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
}
