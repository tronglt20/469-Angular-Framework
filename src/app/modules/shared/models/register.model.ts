export class RegisterModel {
  userName: string;
  email: string;
  password: string;
  // confirmPassword: string;

  public constructor(init?: Partial<RegisterModel>) {
    Object.assign(this, init);
  }
}
