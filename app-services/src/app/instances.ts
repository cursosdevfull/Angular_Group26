import { MyProvider as FirstProvider } from './first.provider';
import { MyProvider as SecondProvider } from './second.provider';


class Generic {
    randomNumber: number = Math.floor(Math.random() * 1000 + 100);

    getRandomNumber(): number {
        return this.randomNumber;
    }
}

/* class FirstProvider { }

class SecondProvider { } */


type PROVIDER = new (...args: any[]) => any;


const mapConfig = new Map<PROVIDER | string, any>();

mapConfig.set(FirstProvider, new Generic());

const instance01 = mapConfig.get(FirstProvider) as Generic;

console.log(instance01.getRandomNumber());

mapConfig.set(SecondProvider, new Generic());

const instance02 = mapConfig.get(SecondProvider) as Generic;

console.log(instance02.getRandomNumber());

/* mapConfig.set('stringKey', new Generic());

const instance03 = mapConfig.get('stringKey') as Generic;

console.log(instance03.getRandomNumber()); */

console.log(mapConfig.entries());
