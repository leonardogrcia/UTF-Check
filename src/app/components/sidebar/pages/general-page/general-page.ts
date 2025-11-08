import { Component, OnInit } from '@angular/core';
import { TabStateService } from '../../../../shared/tab-state.service';

@Component({
  selector: 'app-general-page',
  imports: [],
  templateUrl: './general-page.html',
  styleUrl: './general-page.scss',
})
export class GeneralPage implements OnInit {
  title = '';

  constructor(private tabState: TabStateService) {}

  ngOnInit() {
    this.tabState.currentTabText$.subscribe((text) => {
      this.title = text;
    });
  }
}
