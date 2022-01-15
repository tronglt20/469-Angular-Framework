import { ActionEnum } from "../../shared/models/action.enum";

export class ActivityModel{
    id: number;
    cardId: number;
    userId: number;
    action: ActionEnum;
    currentValue: string;
    previousValue: string;
    onDate: Date;

    public constructor(init?: Partial<ActivityModel>) {
        Object.assign(this, init);
    }
}