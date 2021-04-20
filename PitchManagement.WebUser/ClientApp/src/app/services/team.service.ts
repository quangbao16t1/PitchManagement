import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TeamService {
    baseUrl = environment.apiUrl + 'TeamUser';

    constructor(private http: HttpClient) {
    }

    getAllTeames(keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
      }

    getTeamById(id: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createTeam(team: any) {
        return this.http.post(this.baseUrl, team);
    }

    editTeam(id: any, team: any) {
        return this.http.put(`${this.baseUrl}/${id}`, team);
    }

    deleteTeam(id: any) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}


