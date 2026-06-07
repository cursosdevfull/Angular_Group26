import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [RouterOutlet],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports {
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    console.log("Reports component initialized");
    console.log("Current route state:", this.router.routerState);
  }

  navigateToReport03() {
    // Navigate to Report 03 with a fragment
    this.router.navigate(['report03'], { relativeTo: this.route, fragment: 'firstOfCentury', });
  }
}
