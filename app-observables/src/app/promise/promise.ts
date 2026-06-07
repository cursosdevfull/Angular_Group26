import { Component, signal } from '@angular/core';

export interface User {
  address: Address
  company: Company
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

@Component({
  selector: 'app-promise',
  imports: [],
  templateUrl: './promise.html',
  styleUrl: './promise.scss',
})
export class PromiseComponent {
  data = signal<User[]>([])

  constructor() {
    //this.executePromises01()
    //this.executePromises02()
  }

  ngAfterViewInit() {
    this.executePromises03()
  }

   private async executePromises03() {
    try {
      const promise = new Promise((resolve, reject) => {
        const xmlHttpRequest = new XMLHttpRequest()
        xmlHttpRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');     
        xmlHttpRequest.onload = () => {
          if (xmlHttpRequest.status === 200) {
            resolve(JSON.parse(xmlHttpRequest.response))
          } else {
            reject({
              status: xmlHttpRequest.status,
              message: 'Error fetching data'
            })
          }
        }   
        xmlHttpRequest.send()

      })

      const result = await promise
      //this.data.concat(result as User[])
      this.data.set(result as User[])
      console.log('Promesa 03 resuelta: ', result)
    } catch (error) {
      //this.data = []
      console.log('Promesa 03 rechazada: ', error)
    }
  } 


  private executePromises01() {
   // const promise01 = new Promise((resolve, reject) => {
   //   setTimeout(() => {
        //resolve({ entry: "avocado salad", main: "fettucine alfredo", dessert: "chocolate cake" })
/*         reject({
          status: "REJECTED BECAUSE OF HIGH PRICES",
          message: "We are sorry, but we cannot fulfill your order at this time."
        }) */
     // }, 5000)
    //})

    /*     promise01.then((response) => {
          console.log('Promesa 01 resuelta: ', response)
        }, (error) => {
          console.log('Promesa 01 rechazada: ', error)
        }) */

    /*     promise01
          .then((response) => {
            console.log('Promesa 01 resuelta: ', response)
          })
          .catch((error) => {
            console.log('Promesa 01 rechazada: ', error)
          }) */

    /*     promise01
          .then((response) => {
            console.log('Promesa 01 resuelta: ', response)
          })
    
        promise01.catch((error) => {
          console.log('Promesa 01 rechazada: ', error)
        }) */
  }


}
