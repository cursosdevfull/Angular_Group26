import { Component, signal } from '@angular/core';
import { User } from '../promise/promise';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-observable',
  imports: [],
  templateUrl: './observable.html',
  styleUrl: './observable.scss',
})
export class ObservableComponent {
  data = signal<User[]>([])

  constructor() {
    this.executeObservables()
  }

  private executeObservables() {
    const observable = new Observable<User[]>((observer: Observer<User[]>) => {
        const xmlHttpRequest = new XMLHttpRequest()
        xmlHttpRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');     
        xmlHttpRequest.onload = () => {
          if (xmlHttpRequest.status === 200) {
              observer.next(JSON.parse(xmlHttpRequest.response))
          } else {
              observer.error({
              status: xmlHttpRequest.status,
              message: 'Error fetching data'
            })
          }
        }   
        xmlHttpRequest.send()
    })

    observable.subscribe({
      next: (result) => {
        this.data.set(result)
        console.log('Observable emitió un nuevo valor: ', result)
      },
      error: (error) => {
        this.data.set([])
        console.log('Observable emitió un error: ', error)
      },
      complete: () => {
        console.log('Observable completado')
      }
    })
  }

}
