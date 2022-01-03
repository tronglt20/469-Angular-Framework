export class BusinessModel{
    id: number;
    name: string;
    projectId: number;

    public constructor(init?: Partial<BusinessModel>) {
        Object.assign(this, init);
    }
}