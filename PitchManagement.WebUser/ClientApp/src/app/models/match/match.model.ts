export class Match {
    public id: number;
    public setUpTime: Date;
    public teamName: string;
    public type: number;
    public pitchName: string;
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

    constructor(id: number, setUpTime?: Date, teamName?: string, type?: number, pitchName?: string, convenant?: string,
        level?: string, invitation?: string, inviteeId?: number, receiverId?: number,
        status?: number, createTime?: Date, updateTime?: Date, area?: string, note?: string) {
            this.id = id;
            this.setUpTime = setUpTime;
            this.teamName = teamName;
            this.type = type;
            this.pitchName = pitchName;
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
