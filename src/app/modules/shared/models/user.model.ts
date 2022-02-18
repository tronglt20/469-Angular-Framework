export class UserModel {
  id: string;
  userName: string;
  email: string;
  imagePath: string;
  role: string
  // accessToken?: string;
  // refreshToken?: string;

  public constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}


export class AuthenticatedRespone {
  accessToken: string;
  refreshToken: string;

  public constructor(init?: Partial<AuthenticatedRespone>) {
    Object.assign(this, init);
  }
}
