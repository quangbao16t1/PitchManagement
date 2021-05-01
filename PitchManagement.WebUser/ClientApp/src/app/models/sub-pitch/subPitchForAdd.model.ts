export class SubPitchForAdd {
    public id: number;
    public pitchId: number;
    public name: string;
    public type: number;
    public status: number;
    public createTime: Date;
    public updateTime: Date;

    constructor(id: number, name?: string, pitchId?: number, type?: number, status?: number,
    createTime?: Date, updateTime?: Date) {
        this.id = id;
        this.pitchId = pitchId;
        this.name = name;
        this.type = type;
        this.status = status;
        this.createTime = createTime;
        this.updateTime = updateTime;
     }
}
