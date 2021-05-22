export class PitchForEdit {
    public id: number;
    public name: string;
    public districtId: number;
    public decription: string;
    public address: string;
    public email: string;
    public website: string;
    public avatar: string;
    public phoneNumber: string;
    public updateTime: Date;
    public status: number;

    constructor(id: number, name?: string, districtId?: number, decription?: string, address?: string,
        email?: string, website?: string, avatar?: string, phoneNumber?: string,
        updateTime?: Date, status?: number) {
            this.id = id;
            this.name = name;
            this.decription = decription;
            this.address = address;
            this.email = email;
            this.website = website;
            this.districtId = districtId;
            this.avatar = avatar;
            this.phoneNumber = phoneNumber;
            this.updateTime = updateTime;
            this.status = status;
        }
}
