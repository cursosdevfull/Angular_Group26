import {
  Component,
  computed,
  contentChildren,
  effect,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatColumnDef, MatTable, MatTableModule } from '@angular/material/table';
import { Scrollbars } from '../scrollbars/scrollbars';

@Component({
  selector: 'cdev-lib-table',
  imports: [MatTableModule, Scrollbars],
  templateUrl: './table.html',
  styleUrl: './table.css',
  encapsulation: ViewEncapsulation.None,
})
export class Table {
  dataSource = input.required<any[]>();
  metadata = input.required<any[]>();
  table = viewChild.required<MatTable<any>>(MatTable);
  columnProjectedDefs = contentChildren<MatColumnDef>(MatColumnDef);

  displayedColumns = signal<string[]>([]);

  onRowSelected = output<any>();

  constructor() {
    effect(() => {
      const columns = this.metadata().map((column) => column.field.toString());
      const columnsProjected = this.columnProjectedDefs().map((column) => column.name);
      this.displayedColumns.set([...columns, ...columnsProjected]);
      this.columnProjectedDefs().forEach((col) => this.table().addColumnDef(col));
    });
  }

  rowSelected(row: any) {
    this.onRowSelected.emit(row);
  }
}
