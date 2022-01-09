
export class CardAssign{
    cardId: number;
    assignTo: number;

    userName: string;
    userEmail: string;
    imagePath: string;

    public constructor(init?: Partial<CardAssign>) {
        Object.assign(this, init);
    }
}