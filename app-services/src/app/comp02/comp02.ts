import { Component, Inject } from '@angular/core';
import { Config } from '../config';
import { ImplementationConfig, MyConfig, myConnectionSlack } from '../app.config';

@Component({
  selector: 'app-comp02',
  imports: [],
  templateUrl: './comp02.html',
  styleUrl: './comp02.scss',
})
export class Comp02 {
  currentNumber: number = 20;

  constructor(/*@Inject("MyConfigString")*/ param: ImplementationConfig, @Inject(myConnectionSlack) slackUrl: string) {
    //console.log(param)
    this.currentNumber = param.getRandomNumber();
    console.log(slackUrl.toUpperCase())
    /*   const instance = Config.createInstance();
      this.currentNumber = instance.getCurrentNumber(); */
  }
}
