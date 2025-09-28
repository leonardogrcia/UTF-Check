import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() title = '';
  @Output() buttonClicked = new EventEmitter<string>();

  handleClick() {
    this.buttonClicked.emit(this.title);
  }
}
