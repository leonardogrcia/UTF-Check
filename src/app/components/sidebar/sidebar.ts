import { Component, inject } from '@angular/core';
import { Tab } from './tab/tab';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [Tab, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private router = inject(Router);
}
