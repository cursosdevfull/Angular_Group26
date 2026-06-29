import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'cdev-lib-loader',
  imports: [MatProgressBarModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {}
