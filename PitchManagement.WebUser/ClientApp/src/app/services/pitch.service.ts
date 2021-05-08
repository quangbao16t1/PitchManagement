import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class PitchService {
    baseUrl = environment.apiUrl + 'pitch';

    constructor(private http: HttpClient) {
    }

    getAllPitches(keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
      }
    getPitchByUserId(userId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetPitchByUserId?userId=${userId}`);
    }

    getPitchId(userId: any): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/GetPitchId?userId=${userId}`);
    }

    getPitchById(id: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createPitch(pitch: any) {
        return this.http.post(this.baseUrl, pitch);
    }

    editPitch(id: any, pitch: any) {
        return this.http.put(`${this.baseUrl}/${id}`, pitch);
    }

    deletePitch(id: any) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}


