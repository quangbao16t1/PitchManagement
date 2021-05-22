export class PitchForAdd {
    public id: number;
    public name: string;
    public districtId: number;
    public decription: string;
    public address: string;
    public email: string;
    public website: string;
    public avatar: string;
    public phoneNumber: string;
    public createBy: number;

    constructor(id: number, name?: string, districtId?: number, decription?: string, address?: string,
        email?: string, website?: string, avatar?: string, phoneNumber?: string,
         createBy?: number) {
            this.id = id;
            this.name = name;
            this.decription = decription;
            this.address = address;
            this.districtId = districtId;
            this.email = email;
            this.website = website;
            this.avatar = avatar;
            this.phoneNumber = phoneNumber;
            this.createBy = createBy;
        }
}
