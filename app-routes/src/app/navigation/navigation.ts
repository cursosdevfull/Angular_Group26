import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  currentDate: string;

  constructor() {
    this.currentDate = new Date().toLocaleString();
    console.log("Navigation component initialized");
  }
}
