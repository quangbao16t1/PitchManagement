import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SubPitchService {
    baseUrl = environment.apiUrl + 'SubPitch';

    constructor(private http: HttpClient) {
    }

    getAllSubPitches(keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
    }
    getAllSubPitchByPitchId(pitchId: any, keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetSpByPitchId?pitchId=${pitchId}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
    }
    getSubPitchById(id: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createSubPitch(team: any) {
        return this.http.post(this.baseUrl, team);
    }

    editSubPitch(id: any, team: any) {
        return this.http.put(`${this.baseUrl}/${id}`, team);
    }

    deleteSubPitch(id: any) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    getSbByPitchId(pitchId: any, keyword: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetSubByPitchId?pitchId=${pitchId}&keyword=${keyword}`);
      }
}


