export class MatchForAdd {
    public id: number;
    public setUpTime: Date;
    public teamId: number;
    public type: number;
    public pitchId: number;
    public convenant: string;
    public level: string;
    public invitation: string;
    public inviteeId: number;
    public receiverId: number;
    public status: number;
    public updateTime: Date;
    public createTime: Date;
    public area: string;
    public note: string;

    constructor(id: number, setUpTime?: Date, teamId?: number, type?: number, pitchId?: number,
        convenant?: string, level?: string, invitation?: string, inviteeId?: number, receiverId?: number,
        status?: number, createTime?: Date, updateTime?: Date, area?: string, note?: string) {
            this.id = id;
            this.setUpTime = setUpTime;
            this.teamId = teamId;
            this.type = type;
            this.pitchId = pitchId;
            this.convenant = convenant;
            this.level = level;
            this.invitation = invitation;
            this.inviteeId = inviteeId;
            this.receiverId = receiverId;
            this.status = status;
            this.createTime = createTime;
            this.updateTime = updateTime;
            this.area = area;
            this.note = note;
        }
}
