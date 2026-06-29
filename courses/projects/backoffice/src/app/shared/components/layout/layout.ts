import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cdev-layout',
  imports: [RouterOutlet, MatSidenavModule, Header, Menu, MatCardModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
