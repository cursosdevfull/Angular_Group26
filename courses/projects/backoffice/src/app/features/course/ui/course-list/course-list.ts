import { Component, effect, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Table, Title } from 'lib';
import { Course } from '../../domain';
import { TOKEN_COURSE_APPLICATION } from '../..';
import { PORT_COURSE_APPLICATION } from '../../domain/ports/course-application';
import { Metadata } from '@backoffice/core/types';

@Component({
  selector: 'cdev-course-list',
  imports: [Title, MatButtonModule, Table],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList {
  dataSource = signal<Course[]>([]);
  metadata: Metadata = [
    { label: 'ID', field: 'id' },
    { label: 'Name', field: 'name' },
    { label: 'Description', field: 'description' },
    { label: 'Price', field: 'price', fn: (value: any) => `USD ${value}` },
    {
      label: 'Created At',
      field: 'createdAt',
      fn: (value: any) => new Date(value).toLocaleDateString(),
    },
  ];

  constructor(@Inject(TOKEN_COURSE_APPLICATION) private application: PORT_COURSE_APPLICATION) {
    this.application.getAll.set({ page: 0, limit: 10 });

    effect(() => {
      const response = this.application.responseGetAll();
      if (response) {
        if ('data' in response) {
          console.log('Response from getAll:', response);
          const data = response.data;
          this.dataSource.set(data);
        }
      }
    });
  }
}

/*
  private readonly id: number | undefined;
  private readonly name: string;
  private readonly description: string;
  private readonly price: number;
  private readonly createdAt: Date | undefined;
*/
