import { Component, effect, Inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { TOKEN_COURSE_APPLICATION } from '../../courses.di';
import { PORT_COURSE_APPLICATION } from '../../domain/ports/course-application';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Course } from '../../domain';

@Component({
  selector: 'cdev-sf-course-detail',
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
})
export class CourseDetail {
  course = signal<Course | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(
    @Inject(TOKEN_COURSE_APPLICATION) private application: PORT_COURSE_APPLICATION,
    private route: ActivatedRoute,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.application.getById.set(id);

      effect(() => {
        const response = this.application.responseGetById();
        if (response) {
          if (response.status === 'SUCCESS' && response.data) {
            this.course.set(response.data);
            this.loading.set(false);
          } else {
            this.error.set(response.message || 'Course not found');
            this.loading.set(false);
          }
        }
      });
    } else {
      this.error.set('Invalid course ID');
      this.loading.set(false);
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  getColor(name: string): string {
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
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }
}
