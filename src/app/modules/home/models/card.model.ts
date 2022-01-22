import { PriorityEnum } from "./enums/priority.enum";

export class CardModel{
    id: number;
    name: string;
    duedate: Date;
    description: string;
    priority: PriorityEnum;
    businessId: number;
    index: number

    public constructor(init?: Partial<CardModel>) {
        Object.assign(this, init);
    }
}