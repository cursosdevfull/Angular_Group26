import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorDefinition extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    return `Página ${page + 1} de ${Math.ceil(length / pageSize)}`;
  };
}
