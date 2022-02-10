import { CardModel } from "./card.model";

export class BusinessModel{
    id: number;
    name: string;
    projectId: number;
    cards: CardModel[];

    public constructor(init?: Partial<BusinessModel>) {
        Object.assign(this, init);
    }
}