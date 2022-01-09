
export class CardTag{
    cardId: number;
    tagId: number;
    tagName: string;

    public constructor(init?: Partial<CardTag>) {
        Object.assign(this, init);
    }
}