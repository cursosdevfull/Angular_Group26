import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router = inject(Router);

  constructor() {
    console.log("Home component initialized");
  }

  navigateToReport01() {
    this.router.navigate(['/reports/report01'], { queryParams: { cat: 'Infrastructure' } });
  }

  navigateToReport02() {
    //["/reports", "report02", "2024-01-01", "2024-12-31"].join("/");
    this.router.navigate(["/reports", "report02", "2024-01-01", "2024-12-31"]);
  }

  navigateToReport03() {
    this.router.navigate(['/reports/report03'], { fragment: 'firstOfYear' });
  }
}
