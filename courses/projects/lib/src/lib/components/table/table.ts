import { Component, computed, effect, input, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'cdev-lib-table',
  imports: [MatTableModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  dataSource = input.required<any[]>();
  metadata = input.required<any[]>();

  displayedColumns = signal<string[]>([]);

  constructor() {
    effect(() => {
      const columns = this.metadata().map((column) => column.field);
      this.displayedColumns.set(columns);
    });
  }
}
