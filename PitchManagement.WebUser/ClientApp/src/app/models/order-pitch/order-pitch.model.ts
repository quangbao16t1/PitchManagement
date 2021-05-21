export class OrderPitch {
    public id: number;
    public userId: number;
    public status: number;
    public subPitchDetailId: number;
    public note: string;
    public isDelete: boolean;
    public phoneNumber: string;
    public dateOrder: string;
    public createTime: Date;

    constructor(id: number, userId?: number, subPitchDetailId?: number, note?: string, isDelete?: boolean,
             phoneNumber?: string, createTime?: Date, status?: number) {
            this.id = id;
            this.userId = userId;
            this.subPitchDetailId = subPitchDetailId;
            this.note = note;
            this.isDelete = isDelete;
            this.phoneNumber = phoneNumber;
            this.createTime = createTime;
            this.status = status;
        }
}
