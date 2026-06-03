import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Comp02 } from './comp02/comp02';
import { Comp01 } from './comp01/comp01';

@Component({
  selector: 'app-root',
  imports: [Comp01, Comp02],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
