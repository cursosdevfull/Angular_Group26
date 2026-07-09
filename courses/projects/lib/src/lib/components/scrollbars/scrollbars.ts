import { Component, input } from '@angular/core';

@Component({
  selector: 'cdev-lib-scrollbars',
  imports: [],
  templateUrl: './scrollbars.html',
  styleUrl: './scrollbars.css',
  host: {
    '[style]': 'customStyle()',
  },
})
export class Scrollbars {
  customStyle = input<string>('');
}
