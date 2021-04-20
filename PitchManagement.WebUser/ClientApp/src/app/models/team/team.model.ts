export class Team {
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

    constructor(id: number, name?: string, createBy?: number, level?: string, logo?: string, description?: string, teamImage?: string,
        imageUrl?: string, ageFrom?: number, ageTo?: number, dateOfWeek?: string,
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
        }
}
