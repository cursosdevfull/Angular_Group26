import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class Modal {
  dialog = inject(MatDialog);

  open<T>(component: any, props: { data: T; panelClass?: string; disableClose?: boolean }) {
    return this.dialog.open(component, {
      data: props.data,
      panelClass: props.panelClass,
      disableClose: props.disableClose ?? true,
    });
  }
}
