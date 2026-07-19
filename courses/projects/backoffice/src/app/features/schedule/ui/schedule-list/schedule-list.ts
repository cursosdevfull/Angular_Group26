import { Component, effect, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Paginator, Table, Title } from 'curso-angular-26';
import { Schedule } from '../../domain';
import { TOKEN_SCHEDULE_APPLICATION } from '../..';
import { PORT_SCHEDULE_APPLICATION } from '../../domain/ports/schedule-application';
import { Metadata } from '@backoffice/core/types';
import { environment } from '../../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { Modal } from '@backoffice/core/services/modal';
import { ScheduleForm } from '../schedule-form/schedule-form';
import { Confirm } from '@backoffice/shared/components/confirm/confirm';
import { Notifier } from '@backoffice/shared/services/notifier';

@Component({
  selector: 'cdev-schedule-list',
  imports: [Title, MatButtonModule, Table, MatTableModule, MatIconModule, Paginator],
  templateUrl: './schedule-list.html',
  styleUrl: './schedule-list.scss',
})
export class ScheduleList {
  dataSource = signal<Schedule[]>([]);
  metadata: Metadata = [
    { label: 'ID', field: 'id' },
    { label: 'Course', field: 'courseName' },
    { label: 'Title', field: 'title' },
    { label: 'Teacher', field: 'teacherName' },
    {
      label: 'Date Start',
      field: 'dateStart',
      fn: (value: any) => new Date(value).toLocaleDateString(),
    },
    { label: 'Summary', field: 'summary' },
    { label: 'Requirements', field: 'requeriments' },
    {
      label: 'Created At',
      field: 'createdAt',
      fn: (value: any) => new Date(value).toLocaleDateString(),
    },
  ];

  pageSize = environment.pageSize;
  length = signal<number>(0);
  currentPage = 0;

  modal = inject(Modal);
  notifier = inject(Notifier);

  constructor(@Inject(TOKEN_SCHEDULE_APPLICATION) private application: PORT_SCHEDULE_APPLICATION) {
    this.loadPage(this.currentPage);

    effect(() => {
      const response = this.application.responseGetAll();
      if (response) {
        if ('data' in response) {
          this.length.set(response.total || 0);
          const data = response.data;
          this.dataSource.set(data);
        }
      }
    });

    effect(() => {
      const response =
        this.application.responseCreate() ||
        this.application.responseUpdate() ||
        this.application.responseDelete();

      if (response) {
        this.notifier.open('Operation completed successfully');
      }

      this.loadPage(this.currentPage);
    });
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.application.getAll.set({ page: page + 1, limit: this.pageSize });
  }

  changePage(page: number) {
    this.loadPage(page);
  }

  rowSelected(row: any = null) {
    const reference = this.modal.open(ScheduleForm, {
      data: row,
      panelClass: 'schedule-form-modal',
    });
    reference.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          const schedule = new Schedule(result.data);
          result.action === 'update'
            ? this.application.update.set(schedule)
            : this.application.create.set(schedule);
        }
      },
    });
  }

  delete(event: any, row: any) {
    event.stopPropagation();
    const reference = this.modal.open(Confirm, { data: null });
    (reference.componentInstance as any).message =
      `Are you sure you want to delete the schedule "${row.title}"?`;
    reference.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.application.delete.set(row.id);
        }
      },
    });
  }
}
