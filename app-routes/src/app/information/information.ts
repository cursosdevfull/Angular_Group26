import { Component } from '@angular/core';

@Component({
  selector: 'app-information',
  imports: [],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {
  constructor() {
    console.log("Information component initialized");
  }
}
