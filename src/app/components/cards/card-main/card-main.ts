import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-main.html',
  styleUrls: ['./card-main.scss']
})
export class CardMainComponent {

  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() status: 'done' | 'partial' | 'not-started' = 'not-started';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

  get bgColor(): string {
    switch (this.status) {
      case 'done': return 'card-green';
      case 'partial': return 'card-yellow';
      default: return 'card-red';
    }
  }
}
