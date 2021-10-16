export class User {

    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    token: string;

    constructor(id: number = -1, firstName: string = '', lastName: string = '', username: string = '', password: string = '', email: string = '', token = '') {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.token = token;
    }

}