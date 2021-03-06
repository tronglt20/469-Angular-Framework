import { ActionEnum } from "./enums/action.enum";

export class ActivityModel{
    id: number;
    cardId: number;
    userId: string;
    action: ActionEnum;
    currentValue: string;
    previousValue: string;
    onDate: Date;

    public constructor(init?: Partial<ActivityModel>) {
        Object.assign(this, init);
    }
}