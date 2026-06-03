import { Component, Inject } from '@angular/core';
import { Config } from '../config';
import { ImplementationConfig, MyConfig } from '../app.config';
import { GatewayPayment } from '../gateway-payment';

@Component({
  selector: 'app-comp01',
  imports: [],
  templateUrl: './comp01.html',
  styleUrl: './comp01.scss',
})
export class Comp01 {
  currentNumber: number = 10;

  constructor(/*@Inject(MyConfig)*/ instance: ImplementationConfig, gatewayPayment: GatewayPayment) {
    this.currentNumber = instance.getRandomNumber();
    console.log(gatewayPayment.NAME_PROVIDER)
    //console.log(instance)
    /*     const instance = Config.createInstance();
        this.currentNumber = instance.getCurrentNumber(); */
  }

}


/* const implementationConfig = new ImplementationConfig();
const instance01 = new Comp01(implementationConfig); */