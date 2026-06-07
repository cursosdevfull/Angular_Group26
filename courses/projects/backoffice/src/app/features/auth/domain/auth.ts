export class Auth {
    private readonly email: string;
    private readonly password: string;

    constructor(email: string, password: string) {
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) throw new Error('Email is not valid');
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) throw new Error('Password is not valid');

        this.email = email;
        this.password = password;
    }

    get properties() {
        return {
            email: this.email,
            password: this.password
        };
    }
}