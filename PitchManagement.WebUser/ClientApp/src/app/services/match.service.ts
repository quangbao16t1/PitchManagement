import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MatchService {
    baseUrl = environment.apiUrl + 'Match';

    constructor(private http: HttpClient) {
    }

    getAllMatches(keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
      }

    getListCacthes(keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetListCatch?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
      }

      getMatchByStatus(status: number, keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetMatchByStatus?status=${status}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
      }

    getMatchById(id: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createMatch(Match: any) {
        return this.http.post(this.baseUrl, Match);
    }

    cancelMatch(id: any, match: any) {
        return this.http.put(`${this.baseUrl}/CancelMatch/${id}`, match);
    }

    catchMatch(id: any, match: any) {
        return this.http.put(`${this.baseUrl}/CatchMatch/${id}`, match);
    }

    confirmCatchMatch(id: any, match: any) {
        return this.http.put(`${this.baseUrl}/ConfirmMatch/${id}`, match);
    }

    destroyCatchMatch(id: any, match: any) {
        return this.http.put(`${this.baseUrl}/DestroyMatch/${id}`, match);
    }

    editMatch(id: any, Match: any) {
        return this.http.put(`${this.baseUrl}/${id}`, Match);
    }

    deleteMatch(id: any) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}


