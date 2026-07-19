import { Component, effect, Inject, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScheduleProperties } from '../../domain';
import { form, FormField, min, required, SchemaPathTree } from '@angular/forms/signals';
import { ErrorMessage } from 'curso-angular-26';
import { MatSelectModule } from '@angular/material/select';
import { TOKEN_SCHEDULE_APPLICATION } from '../../schedule.di';
import { PORT_SCHEDULE_APPLICATION } from '../../domain/ports/schedule-application';
import { DateTimePicker } from '@backoffice/shared/components/date-time-picker/date-time-picker';

@Component({
  selector: 'cdev-schedule-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormField,
    ErrorMessage,
    MatSelectModule,
    DateTimePicker,
  ],
  templateUrl: './schedule-form.html',
  styleUrl: './schedule-form.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ScheduleForm {
  reference: MatDialogRef<ScheduleForm> = inject(MatDialogRef<ScheduleForm>);

  data = inject(MAT_DIALOG_DATA);
  title = signal<string>('');
  label = signal<string>('');

  model = signal<ScheduleProperties>({
    id: this.data && this.data.id ? this.data.id : undefined,
    courseId: this.data && this.data.courseId ? this.data.courseId : '',
    dateStart: this.data && this.data.dateStart ? this.data.dateStart : '',
    title: this.data && this.data.title ? this.data.title : '',
    teacherName: this.data && this.data.teacherName ? this.data.teacherName : '',
    summary: this.data && this.data.summary ? this.data.summary : '',
    requeriments: this.data && this.data.requeriments ? this.data.requeriments : '',
  });

  schema = (schema: SchemaPathTree<ScheduleProperties>) => {
    required(schema.courseId, { message: 'Course ID is required' });
    required(schema.dateStart, { message: 'Date Start is required' });
    required(schema.title, { message: 'Title is required' });
    required(schema.teacherName, { message: 'Teacher Name is required' });
    required(schema.summary, { message: 'Summary is required' });
    required(schema.requeriments, { message: 'Requirements is required' });
  };

  scheduleForm = form(this.model, this.schema);

  courses = signal<{ id: string; name: string }[]>([]);

  constructor(@Inject(TOKEN_SCHEDULE_APPLICATION) private application: PORT_SCHEDULE_APPLICATION) {
    this.title.set(this.data ? 'Update Schedule' : 'Create Schedule');
    this.label.set(this.data ? 'Update' : 'Create');

    this.application.getAllCoursesList.set(true);

    effect(() => {
      const response = this.application.responseGetAllCoursesList();
      if (response && response.data) {
        this.courses.set(response.data);
      }
    });
  }

  action() {
    const props = this.scheduleForm().value();
    this.reference.close({ action: props.id ? 'update' : 'create', data: props });
  }
}
