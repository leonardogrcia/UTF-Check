import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from "./tab/tab";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  imports: [Tab],
})
export class Sidebar {

  @Output() sidebarClick = new EventEmitter<string>();

  private router = inject(Router);

  openModalFromSidebar(title: string) {
    this.sidebarClick.emit(title);
  }
}
