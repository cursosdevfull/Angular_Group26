import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CourseProperties } from '../../domain';
import { form, FormField, min, required, SchemaPathTree } from '@angular/forms/signals';
import { ErrorMessage } from 'lib';

@Component({
  selector: 'cdev-course-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormField,
    ErrorMessage,
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CourseForm {
  reference: MatDialogRef<CourseForm> = inject(MatDialogRef<CourseForm>);

  data = inject(MAT_DIALOG_DATA);
  title = signal<string>('');
  label = signal<string>('');

  model = signal<CourseProperties>({
    id: this.data && this.data.id ? this.data.id : undefined,
    name: this.data && this.data.name ? this.data.name : '',
    description: this.data && this.data.description ? this.data.description : '',
    price: this.data && this.data.price ? this.data.price : 0,
  });

  schema = (schema: SchemaPathTree<CourseProperties>) => {
    required(schema.name, { message: 'Name is required' });
    required(schema.description, { message: 'Description is required' });
    required(schema.price, { message: 'Price is required' });
    min(schema.price, 1, { message: 'Price must be greater than or equal to 1' });
  };

  courseForm = form(this.model, this.schema);

  constructor() {
    this.title.set(this.data ? 'Update Course' : 'Create Course');
    this.label.set(this.data ? 'Update' : 'Create');
  }

  action() {
    const props = this.courseForm().value();
    this.reference.close({ action: props.id ? 'update' : 'create', data: props });
  }
}
