export class TeamForUpdate {
    public id: number;
    public name: string;
    public createBy: number;
    public level: string;
    public logo: string;
    public description: string;
    public teamImage: string;
    public imageUrl: string;
    public ageFrom: number;
    public ageTo: number;
    public dateOfWeek: string;
    public startTime: TimeRanges;
    public createTime: Date;
    public updateTime: Date;

    constructor(id: number, name?: string, createBy?: number, level?: string, logo?: string, description?: string, teamImage?: string,
        imageUrl?: string, ageFrom?: number, ageTo?: number, dateOfWeek?: string, createTime?: Date, updateTime?: Date,
        startTime?: TimeRanges) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.createBy = createBy;
            this.level = level;
            this.logo = logo;
            this.teamImage = teamImage;
            this.imageUrl = imageUrl;
            this.ageFrom = ageFrom;
            this.ageTo = ageTo;
            this.dateOfWeek = dateOfWeek;
            this.startTime = startTime;
            this.createTime = createTime;
            this.updateTime = updateTime;
        }
}
