import { Component, effect, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Paginator, Table, Title } from 'curso-angular-26';
import { Course } from '../../domain';
import { TOKEN_COURSE_APPLICATION } from '../..';
import { PORT_COURSE_APPLICATION } from '../../domain/ports/course-application';
import { Metadata } from '@backoffice/core/types';
import { environment } from '../../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { Modal } from '@backoffice/core/services/modal';
import { CourseForm } from '../course-form/course-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Confirm } from '@backoffice/shared/components/confirm/confirm';
import { Notifier } from '@backoffice/shared/services/notifier';

@Component({
  selector: 'cdev-course-list',
  imports: [Title, MatButtonModule, Table, MatTableModule, MatIconModule, Paginator],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList {
  dataSource = signal<Course[]>([]);
  metadata: Metadata = [
    { label: 'ID', field: 'id' },
    { label: 'Name', field: 'name' },
    { label: 'Description', field: 'description' },
    { label: 'Price', field: 'price', fn: (value: any) => `USD ${parseFloat(value).toFixed(2)}` },
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

  constructor(@Inject(TOKEN_COURSE_APPLICATION) private application: PORT_COURSE_APPLICATION) {
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
    const reference = this.modal.open(CourseForm, { data: row, panelClass: 'course-form-modal' });
    reference.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          const course = new Course(result.data);
          result.action === 'update'
            ? this.application.update.set(course)
            : this.application.create.set(course);
        }
      },
    });
  }

  delete(event: any, row: any) {
    event.stopPropagation();
    const reference = this.modal.open(Confirm, { data: null });
    (reference.componentInstance as any).message =
      `Are you sure you want to delete the course "${row.name}"?`;
    reference.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.application.delete.set(row.id);
        }
      },
    });
  }
}
