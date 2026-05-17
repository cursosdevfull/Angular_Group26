import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  @Input() name: string = ""
  @Input() email: string = ""

  @Input() user: {name: string, email: string} = {name: "", email: ""}

  @Output() onUserSelected = new EventEmitter<{name: string, email: string}>()

  selectUser() {
    this.onUserSelected.emit(this.user)
  }
}
