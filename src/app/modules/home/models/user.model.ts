
export class UserModel{
    id: number;
    name: string;
    email: string;
    imagePath: string;

    public constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}