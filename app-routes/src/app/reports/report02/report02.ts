import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-report02',
  imports: [],
  templateUrl: './report02.html',
  styleUrl: './report02.scss',
})
export class Report02 {
    route = inject(ActivatedRoute);
  title = this.route.snapshot.data['title'] || 'Default Report Title';
  description = this.route.snapshot.data['description'] || 'Default Report Description';
  rolesAllowed = this.route.snapshot.data['rolesAllowed'] || [];
  //startDate = this.route.snapshot.params['startDate'] || 'Default Start Date';
  //endDate = this.route.snapshot.params['endDate'] || 'Default End Date';
  startDate = ""
  endDate = ""

  router = inject(Router);

  constructor() {
    console.log(this.route.snapshot);
    const {params} = this.route.snapshot;
    console.log("Report02 component initialized with params:", params);
    this.route.params.subscribe({
      next: (params: Params) => {
        this.startDate = params['startDate'] || 'Default Start Date';
        this.endDate = params['endDate'] || 'Default End Date';
        console.log("Route params changed:", params);
      }
    })
  }

  loadNewParameters() {
    const startDate = '2024-06-01';
    const endDate = '2024-06-30';

    this.router.navigate(["/reports/report02", startDate, endDate]);
  }
}
