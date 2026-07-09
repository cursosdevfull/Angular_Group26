import { Component, input, output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorDefinition } from './paginator-definition';

@Component({
  selector: 'cdev-lib-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorDefinition }],
})
export class Paginator {
  pageSize = input.required<number>();
  length = input.required<number>();
  onChangePage = output<number>();

  changePage(event: PageEvent) {
    this.onChangePage.emit(event.pageIndex);
  }
}
