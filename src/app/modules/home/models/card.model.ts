import { Priority } from "../../shared/models/priority.enum";

export class CardModel{
    id: number;
    name: string;
    duedate: Date;
    description: string;
    priority: Priority;
    businessId: number;
    index: number

    public constructor(init?: Partial<CardModel>) {
        Object.assign(this, init);
    }
}