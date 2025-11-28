import { Component, OnInit } from '@angular/core';
import { TabStateService } from '../../shared/tab-state.service';
import { Sidebar } from "../../components/sidebar/sidebar";

@Component({
  selector: 'app-profile-page',
  imports: [Sidebar],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  title = '';

  constructor(private tabState: TabStateService) {}

  ngOnInit() {
    this.tabState.currentTabText$.subscribe((text) => {
      this.title = text;
    });
  }
}
