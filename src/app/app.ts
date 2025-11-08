import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import {CardMain, CardMainComponent} from './components/cards/card-main/card-main';
import { AppButtonComponent } from "./components/buttons/button/button";
import { AppInputComponent } from "./components/input/input";

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [RouterOutlet, CardMainComponent, AppButtonComponent, AppInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
=======
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
>>>>>>> origin/feature/routing
})


export class App {
protected readonly title = signal('UTF-Check');
password: any;
username: any;
}
