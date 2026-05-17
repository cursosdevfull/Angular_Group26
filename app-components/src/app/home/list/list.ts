import { Component } from '@angular/core';
import { UserDetail } from '../user-detail/user-detail';

@Component({
  selector: 'app-list',
  imports: [UserDetail],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public users = [
    {name: "Carlos", email: "carlos@email.com"},
    {name: "Maria", email: "maria@email.com"},
    {name: "João", email: "joao@email.com"},
    {name: "Gabriela", email: "gabriela@correo.com"},
    {name: "Pedro", email: "pedro@email.com"}
  ]

  handleUserSelected(user: {name: string, email: string}) {
    alert(`User selected from List: ${user.name} (${user.email})`)
  }
}
