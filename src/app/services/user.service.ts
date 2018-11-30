import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    getUser(access_token: access_token) {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + access_token
          })
        };
        return this.http.post<any>(environment.apiUrl + `/auth/user/`, {}, httpOptions)
            .pipe(map(user => {
                if (user && user.username)
                    localStorage.setItem('currentUser', user.username);

                return user;
            }));
    }
}