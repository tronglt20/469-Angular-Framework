export class ProjectModel{
    id: number;
    name: string;
    createdBy: number;

    public constructor(init?: Partial<ProjectModel>) {
        Object.assign(this, init);
    }
}