import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Title } from 'lib';

@Component({
  selector: 'cdev-schedule-list',
  imports: [Title, MatButtonModule],
  templateUrl: './schedule-list.html',
  styleUrl: './schedule-list.scss',
})
export class ScheduleList {}
