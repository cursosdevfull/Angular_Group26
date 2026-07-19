import { Component, effect, Inject, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { TOKEN_COURSE_APPLICATION } from '../../courses.di';
import { PORT_COURSE_APPLICATION } from '../../domain/ports/course-application';
import { environment } from '../../../../../environments/environment.development';
import { Course } from '../../domain';

@Component({
  selector: 'cdev-sf-course-list',
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    DatePipe,
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList {
  dataSource = signal<Course[]>([]);
  loading = signal<boolean>(true);

  private router = inject(Router);

  constructor(@Inject(TOKEN_COURSE_APPLICATION) private application: PORT_COURSE_APPLICATION) {
    this.application.getAll.set({ page: 1, limit: 100 });

    effect(() => {
      const response = this.application.responseGetAll();
      if (response) {
        if ('data' in response) {
          const data = response.data;
          this.dataSource.set(data);
          this.loading.set(false);
        }
      }
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  getRandomColor(index: number): string {
    const colors = [
      '#4F46E5',
      '#7C3AED',
      '#DB2777',
      '#DC2626',
      '#EA580C',
      '#CA8A04',
      '#16A34A',
      '#0891B2',
      '#2563EB',
      '#9333EA',
    ];
    return colors[index % colors.length];
  }

  viewDetail(course: any): void {
    this.router.navigate(['/courses', course.id]);
  }
}
