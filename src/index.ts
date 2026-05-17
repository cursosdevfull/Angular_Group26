function firstDecorator(target: new (...args: any[]) => any) {
    console.log("First decorator called on:", target);
    const originalConstructor = target;

    const instance = new originalConstructor("Example");
    console.log("Instance created in decorator:", instance);


    /*function newConstructor(...args: any[]) {
        console.log("Creating instance of:", originalConstructor.name);
        return new originalConstructor(...args);
    }*/
}

function Component(props: { selector: string }) {
    return function (target: new (...args: any[]) => any) {
        const root = document.querySelector(props.selector);
        if (root) {
            const instance = new target();

            root.textContent = `Hello, ${instance.user}! This is a component. Current time: ${instance.time}. Random value: ${instance.randomValue}`;
        }
    }
}



@Component({ selector: "#app" })
class Person {
    user: string = "Sergio Hidalgo";
    time: string
    randomValue: number = Math.random();

    constructor() {
        //this.user = name;
        this.time = new Date().toISOString();
    }
}

//const instance = new Person("John");