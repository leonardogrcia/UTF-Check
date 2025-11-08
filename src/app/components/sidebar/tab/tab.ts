import { Component, Input } from '@angular/core';
import { TabStateService } from '../../../shared/tab-state.service';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
})
export class Tab {
  @Input() text = '';

  constructor(private tabState: TabStateService) {}

  onClick() {
    this.tabState.setTabText(this.text);
  }
}
