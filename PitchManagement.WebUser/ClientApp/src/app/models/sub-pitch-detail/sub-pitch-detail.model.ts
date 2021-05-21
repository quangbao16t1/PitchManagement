export class SubPitchDetail {
    public id: number;
    public subPitchId: number;
    public cost: number;
    public startTime: string;
    public endTime: string;
    public createTime: Date;
    public updateTime: Date;

    constructor(id: number, subPitchId?: number, cost?: number, startTime?: string,
        endTime?: string, createTime?: Date, updateTime?: Date) {
        this.id = id;
        this.subPitchId = subPitchId;
        this.cost = cost;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createTime = createTime;
        this.updateTime = updateTime;
     }
}
