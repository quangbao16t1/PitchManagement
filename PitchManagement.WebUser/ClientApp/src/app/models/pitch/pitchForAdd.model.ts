export class PitchForAdd {
    public id: number;
    public name: string;
    public district: string;
    public decription: string;
    public address: string;
    public email: string;
    public website: string;
    public avatar: string;
    public phoneNumber: string;
    public createTime: Date;
    public updateTime: Date;
    public createBy: number;
    public status: number;

    constructor(id: number, name?: string, district?: string, decription?: string, address?: string,
        email?: string, website?: string, avatar?: string, phoneNumber?: string,
        createTime?: Date, updateTime?: Date, createBy?: number, status?: number) {
            this.id = id;
            this.name = name;
            this.decription = decription;
            this.address = address;
            this.email = email;
            this.website = website;
            this.avatar = avatar;
            this.phoneNumber = phoneNumber;
            this.createTime = createTime;
            this.updateTime = updateTime;
            this.createBy = createBy;
            this.status = status;
        }
}
