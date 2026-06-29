import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MenuService } from './services/menu';

@Component({
  selector: 'cdev-menu',
  imports: [RouterLink, MatIconModule, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  providers: [MenuService]
})
export class Menu {
  itemsMenu = inject(MenuService).getMenuItems();
}
