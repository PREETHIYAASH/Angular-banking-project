export class User {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    gender: string = '';
    dob: string = '';
    email: string = '';
    username: string = '';
    pass: string = '';
    cpass: string = '';
    role: string = '';
    mobileno:string='';
    activateAccount: boolean = false;
    address: string = '';
    constructor(
        id: number,
        firstname: string,
        lastname: string,
        gender: string,
        dob: string,
        email: string,
        username: string,
        pass: string,
        cpass: string,
        role: string,
        mobileno:string,
        activateAccount: boolean,
        address: string
        ) {
        this.id = id;
        this.firstName = firstname;
        this.lastName = lastname;
        this.gender = gender;
        this.dob = dob;
        this.email = email;
        this.username = username;
        this.pass = pass;
        this.cpass = cpass;
        this.role = role;
        this.mobileno=mobileno;
        this.activateAccount = activateAccount;
        this.address = address;
    }
}