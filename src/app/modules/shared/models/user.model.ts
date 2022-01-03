export class UserModel{
    id: number;
    name: string;
    email: string;
    role: number;

    public constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}