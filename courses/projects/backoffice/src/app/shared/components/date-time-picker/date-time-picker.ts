import { Component, computed, input, model } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormValueControl,
  ValidationError,
  WithOptionalField,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'cdev-date-time-picker',
  imports: [MatDatepickerModule, MatTimepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './date-time-picker.html',
  styleUrl: './date-time-picker.scss',
})
export class DateTimePicker implements FormValueControl<string> {
  value = model<string>('');

  label = input<string>('');

  touched = model(false);
  disabled = input(false);
  invalid = input(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  required = input(false);

  protected selectedDate = computed<Date | null>(() => this.parseDateTime(this.value()));

  private parseDateTime(value: string): Date | null {
    if (!value) return null;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private toDateTimeLocal(value: Date): string {
    return `${value.getFullYear()}-${this.pad(value.getMonth() + 1)}-${this.pad(value.getDate())}T${this.pad(value.getHours())}:${this.pad(value.getMinutes())}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const pickedDate = event.value;
    if (!pickedDate) {
      this.value.set('');
      return;
    }

    const current = this.selectedDate();
    const next = new Date(pickedDate);
    if (current) {
      next.setHours(current.getHours(), current.getMinutes(), 0, 0);
    } else {
      next.setHours(0, 0, 0, 0);
    }
    this.value.set(this.toDateTimeLocal(next));
  }

  onTimeChange(pickedTime: Date | null) {
    if (!pickedTime) return;

    const current = this.selectedDate() ?? new Date(pickedTime);
    const next = new Date(current);
    next.setHours(pickedTime.getHours(), pickedTime.getMinutes(), 0, 0);
    this.value.set(this.toDateTimeLocal(next));
  }

  onBlur() {
    this.touched.set(true);
  }
}
