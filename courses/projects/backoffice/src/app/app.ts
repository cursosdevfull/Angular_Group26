import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './shared/components/loader/loader';
import { LoadingService } from './shared/services/loading';

@Component({
  selector: 'cdev-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  loading = inject(LoadingService).loading;
}
