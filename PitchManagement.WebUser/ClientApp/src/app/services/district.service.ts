import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DistrictService {
  baseUrl = environment.apiUrl + 'district';
  baseUrl1 = environment.apiUrl + 'ward';

  constructor(private http: HttpClient) {
  }

  getAllDistricts(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}`);
  }
  getDistrictById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createDistrict(District: any) {
    return this.http.post(this.baseUrl, District);
  }

  editDistrict(id: any, District: any) {
    return this.http.put(`${this.baseUrl}/${id}`, District);
  }

  deleteDistrict(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getWardByDistrictId(districtId: any): Observable<any> {
    return this.http.get(`${this.baseUrl1}/GetWardBytDistrictId?districtId=${districtId}`);
  }
}
