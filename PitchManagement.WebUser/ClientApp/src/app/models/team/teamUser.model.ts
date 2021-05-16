export class TeamUser {
    public id: number;
    public teamName: string;
    public teamId: number;
    public createBy: number;
    public level: string;
    public logo: string;
    public description: string;
    public imageUrl: string;
    public ageFrom: number;
    public ageTo: number;
    public dateOfWeek: string;
    public startTime: TimeRanges;

    constructor(id: number, teamName?: string, teamId?: number, createBy?: number, level?: string, logo?: string, description?: string,
        imageUrl?: string, ageFrom?: number, ageTo?: number, dateOfWeek?: string,
        startTime?: TimeRanges) {
            this.id = id;
            this.teamName = teamName;
            this.teamId = teamId;
            this.description = description;
            this.createBy = createBy;
            this.level = level;
            this.logo = logo;
            this.imageUrl = imageUrl;
            this.ageFrom = ageFrom;
            this.ageTo = ageTo;
            this.dateOfWeek = dateOfWeek;
            this.startTime = startTime;
        }
}
