import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SubPitchDetailService {
    baseUrl = environment.apiUrl + 'SubPitchDetai';

    constructor(private http: HttpClient) {
    }

    getAllSubPitchDetailes(keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
    }
    getSubPitchDetailBySpId(subPitchId: any, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetSubPitchDetailBySpId?subPitchId=${subPitchId}&page=${page}&pageSize=${pageSize}`);
    }
    getSubPitchDetailEmpty(dateOrder: any, subPitchId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetSubPitchDetailEmpty?dateOrder=${dateOrder}&subPitchId=${subPitchId}`);
    }
    getSubPitchDetailById(id: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createSubPitchDetail(subPitchDetail: any) {
        return this.http.post(this.baseUrl, subPitchDetail);
    }

    editSubPitchDetail(id: any, subPitchDetail: any) {
        return this.http.put(`${this.baseUrl}/${id}`, subPitchDetail);
    }

    deleteSubPitchDetail(id: any) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}


