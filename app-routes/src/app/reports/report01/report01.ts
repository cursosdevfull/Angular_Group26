import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report01',
  imports: [],
  templateUrl: './report01.html',
  styleUrl: './report01.scss',
})
export class Report01 {
  route = inject(ActivatedRoute);
  title = this.route.snapshot.data['title'] || 'Default Report Title';
  description = this.route.snapshot.data['description'] || 'Default Report Description';
  rolesAllowed = this.route.snapshot.data['rolesAllowed'] || [];
  category = ""
  //category = this.route.snapshot.queryParams['cat'] || 'Default Category';

  router = inject(Router);

  constructor() {
    console.log(this.route.snapshot);
    const {data, queryParams} = this.route.snapshot;
    console.log("Report01 component initialized with data:", data);
    console.log("Report01 component initialized with query params:", queryParams);

    this.route.queryParams.subscribe({
      next: (params) => {
        console.log("Query params changed:", params);
        this.category = params['cat'] || 'Default Category';
      }
    })

  }


  loadNewCategory() {
    const category = 'New Category';
    this.router.navigate(["/reports/report01"], { queryParams: { cat: category }, queryParamsHandling: 'merge' });
  }
}
