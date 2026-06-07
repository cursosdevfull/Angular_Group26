import { Component, signal } from '@angular/core';
import { PromiseComponent } from './promise/promise';
import { ObservableComponent } from './observable/observable';

@Component({
  selector: 'app-root',
  imports: [ObservableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app-observables'); 
}
