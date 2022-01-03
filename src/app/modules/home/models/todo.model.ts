
export class TodoModel{
    id: number;
    name: string;
    isCompleted: boolean;
    cardId: number;

    public constructor(init?: Partial<TodoModel>) {
        Object.assign(this, init);
    }
}