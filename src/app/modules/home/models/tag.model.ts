
export class TagModel{
    id: number;
    name: string;
    projectId: string;

    public constructor(init?: Partial<TagModel>) {
        Object.assign(this, init);
    }
}