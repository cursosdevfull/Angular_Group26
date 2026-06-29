import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Title } from 'lib';

@Component({
  selector: 'cdev-user-list',
  imports: [Title, MatButtonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {}
