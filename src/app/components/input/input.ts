import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
})
export class AppInputComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() type: string = 'text';

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}