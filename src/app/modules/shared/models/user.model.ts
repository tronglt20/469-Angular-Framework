export class UserModel {
  asObservable(): import("rxjs").Observable<UserModel> {
    throw new Error('Method not implemented.');
  }
  id: number;
  userName: string;
  email: string;
  imagePath: string;
  token?: string;

  public constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
