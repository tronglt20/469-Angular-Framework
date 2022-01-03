export class LoginModel{
    username: string;
    password: string;

    constructor(init?: Partial<LoginModel>){
        Object.assign(this.password, init)
    }
}