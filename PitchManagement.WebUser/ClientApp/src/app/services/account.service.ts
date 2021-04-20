import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserUpdate } from '../models/user/userUpdate.model';

@Injectable()
export class AccountService {
    baseUrl = environment.apiUrl + 'account';

    constructor(private http: HttpClient) {
    }

    update(userUpdate: UserUpdate): Observable<UserUpdate> {
        console.log(userUpdate);
        return this.http.post<UserUpdate>(this.baseUrl, userUpdate);
      }
    updateUser(id: any, userUpdate: any) {
        return this.http.put(`${this.baseUrl}/${id}`, userUpdate);
    }
      changePassword(currentPassword: string, newPassword: string): Observable<{}> {
        return this.http.post<any>(`${this.baseUrl}/change-password`, { currentPassword: currentPassword, newPassword: newPassword });
      }
}


