import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Title } from 'curso-angular-26';

@Component({
  selector: 'cdev-user-list',
  imports: [Title, MatButtonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {}
