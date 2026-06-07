import { Component, signal } from '@angular/core';
import { form, FormField, max, min, required } from '@angular/forms/signals';
import { ICanComponentDeactivate } from '../guards/unsave-guard';

@Component({
  selector: 'app-payments',
  imports: [FormField],
  templateUrl: './payments.html',
  styleUrl: './payments.scss',
})
export class Payments implements ICanComponentDeactivate {
  initialData = {
    staffName: '',
    paymentAmount: 0,
  }

  dataSaved = false

  model = signal(this.initialData);

  form = form(this.model, (schema) => {
    required(schema.staffName, {message: 'Staff Name is required'});
    required(schema.paymentAmount, {message: 'Payment Amount is required'});
    min(schema.paymentAmount, 1, {message: 'Payment Amount must be greater than 1'});
  })

  constructor() {
    console.log("Payments component initialized");
  }

  unsavedChanges(): boolean {
    return this.form().dirty() && !this.dataSaved;
  }

  submitPayment() {
    this.dataSaved = true;
  }
}
