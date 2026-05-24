import { Component, computed, effect, inject, Injector, linkedSignal, signal, runInInjectionContext } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  operator1 = signal(10)
  operator2 = signal(30)

  sum = computed(() => this.operator1() + this.operator2())

  user = signal<number>(1)

  userInfo = signal<any>(null)

  fare = signal(100);
  tax = computed(() => this.fare() * 0.1);
  total = linkedSignal(() => this.fare() + this.tax());

  //injector = inject(Injector)

  //runInInjectionContext(this.injector, () => {})

  /*   runInInjectionContext(this.injector, () => {
      effect(() => {
        this.getInfoUser(this.user())
      }, { injector: this.injector })
    }) */

  constructor() {
    effect(() => {
      this.getInfoUser(this.user())
    })
  }

  incrementOperator1() {
    this.operator1.update(current => current + 1)
    //const current = this.operator1()
    //this.operator1.set(current + 1)
  }

  incrementOperator2() {
    this.operator2.update(current => current + 1)
    //const current = this.operator2()
    //this.operator2.set(current + 1)
  }

  updateSum() {
    //this.sum = this.operator1 + this.operator2
  }

  getInfoUser(id: number) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.userInfo.set(data)
      })
  }

  changeUser() {
    this.user.update(current => current + 1)
    //this.getInfoUser(this.user())
  }

  newFare() {
    this.total.update(current => current + 50)
  }

  increaseFare() {
    this.fare.update(current => current + 50)
  }
}
