export class ModifyUser {

    firstName: string;
    lastName: string;
    newPassword: string;
    currentPassword: string;

    constructor(firstName: string = '', lastName: string = '', newPassword: string = '', currentPassword: string = '') {
        this.firstName = firstName;
        this.lastName = lastName;
        this.newPassword = newPassword;
        this.currentPassword = currentPassword;
    }

    public isReady(): boolean {
        return (this.firstName.length > 0 || this.lastName.length > 0 || this.newPassword.length > 0) && this.currentPassword.length > 0;
    }

}