export class LoginModel {
  email: string;
  password: string;

  constructor(init?: Partial<LoginModel>) {
    Object.assign(this, init);
  }
}
