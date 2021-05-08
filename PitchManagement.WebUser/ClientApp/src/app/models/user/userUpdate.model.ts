export class UserUpdate {
    public id: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber: string;
    public address: string;
    public gender: boolean;
    public imageUrl: string;
    public groupUserId: Number;

    constructor(id?: string, username?: string, firstName?: string, lastName?: string, email?: string,
        phoneNumber?: string, address?: string, gender?: boolean, imageUrl?: string, groupUserId?: Number) {
        this.id = id;
        this.userName = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.gender = gender;
        this.imageUrl = imageUrl;
        this.groupUserId = groupUserId;
    }
}
