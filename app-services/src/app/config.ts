export class Config {
    static instance: Config;
    private currentNumber = Math.floor(Math.random() * 1000 + 10)

    getCurrentNumber(): number {
        return this.currentNumber;
    }

    private constructor() {
        console.log('Config instance created');
    }

    static createInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

}

