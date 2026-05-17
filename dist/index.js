"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function firstDecorator(target) {
    console.log("First decorator called on:", target);
    const originalConstructor = target;
    const instance = new originalConstructor("Example");
    console.log("Instance created in decorator:", instance);
    /*function newConstructor(...args: any[]) {
        console.log("Creating instance of:", originalConstructor.name);
        return new originalConstructor(...args);
    }*/
}
function Component(props) {
    return function (target) {
        const root = document.querySelector(props.selector);
        if (root) {
            const instance = new target();
            root.textContent = `Hello, ${instance.user}! This is a component. Current time: ${instance.time}. Random value: ${instance.randomValue}`;
        }
    };
}
let Person = class Person {
    constructor() {
        this.user = "Sergio Hidalgo";
        this.randomValue = Math.random();
        //this.user = name;
        this.time = new Date().toISOString();
    }
};
Person = __decorate([
    Component({ selector: "#app" }),
    __metadata("design:paramtypes", [])
], Person);
//const instance = new Person("John");
