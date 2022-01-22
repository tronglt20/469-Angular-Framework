
export class CardAssign{
    cardId: number;
    assignTo: number;

    userName: string;
    email: string;
    imagePath: string;

    public constructor(init?: Partial<CardAssign>) {
        Object.assign(this, init);
    }
}