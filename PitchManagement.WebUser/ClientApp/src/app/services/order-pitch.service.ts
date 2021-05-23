import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrderPitchService {
    baseUrl = environment.apiUrl + 'OrderPitch';

    constructor(private http: HttpClient) {
    }

    getAllOrderPitch(keyword: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
    }
    getAllOrderPitchByUserId(userId: any, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetOrderByUserId?userId=${userId}&page=${page}&pageSize=${pageSize}`);
    }
    getOrderPitchByPitchId(pitchId: any, status: number, page: number, pageSize: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/GetOrderByPitchId?pitchId=${pitchId}&status=${status}&page=${page}&pageSize=${pageSize}`);
    }
    getOrderPitchByDateUserId(dateOrder: any, userId: any, page: number, pageSize: number): Observable<any> {
        return this.http.
        get(`${this.baseUrl}/GetOrderByDateOrder?dateOrder=${dateOrder}&userId=${userId}&page=${page}&pageSize=${pageSize}`);
    }
    getOrderPitchByDatePitchId(dateOrder: any, status: any, pId: any, page: number, pageSize: number): Observable<any> {
        return this.http.
        get(`${this.baseUrl}/GetByDatePitchId?dateOrder=${dateOrder}&status=${status}&pitchId=${pId}&page=${page}&pageSize=${pageSize}`);
    }
    getOrderPitchById(id: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createOrderPitch(orderPitch: any) {
        return this.http.post(this.baseUrl, orderPitch);
    }

    editOrderPitch(id: any, orderPitch: any) {
        return this.http.put(`${this.baseUrl}/${id}`, orderPitch);
    }

    deleteOrderPitch(id: any) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}


