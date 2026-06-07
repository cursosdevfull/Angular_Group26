import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report03',
  imports: [],
  templateUrl: './report03.html',
  styleUrl: './report03.scss',
})
export class Report03 {
    route = inject(ActivatedRoute);
  title = this.route.snapshot.data['title'] || 'Default Report Title';
  description = this.route.snapshot.data['description'] || 'Default Report Description';
  rolesAllowed = this.route.snapshot.data['rolesAllowed'] || [];
  //fragment = this.route.snapshot.fragment || 'Default Fragment';
  fragment = ""

  router = inject(Router);

  constructor() {
    console.log(this.route.snapshot);
    const {data} = this.route.snapshot;
    console.log("Report01 component initialized with data:", data);

    this.route.fragment.subscribe({
      next: (fragment) => {
        console.log("Fragment changed:", fragment);
        this.fragment = fragment || 'Default Fragment';
      }
    })
  }

  loadNewFragment() {
    const newFragment = 'midYear';
    this.router.navigate(["/reports/report03"], { fragment: newFragment });
  }
}
