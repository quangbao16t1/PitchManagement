export class SubPitch {
    public id: number;
    public pitchName: string;
    public pitchId: number;
    public name: string;
    public type: number;
    public status: number;
    public createTime: Date;
    public updateTime: Date;

    constructor(id: number, name?: string, pitchName?: string, type?: number, status?: number,
    createTime?: Date, updateTime?: Date) {
        this.id = id;
        this.pitchName = pitchName;
        this.name = name;
        this.type = type;
        this.status = status;
        this.createTime = createTime;
        this.updateTime = updateTime;
     }
}
