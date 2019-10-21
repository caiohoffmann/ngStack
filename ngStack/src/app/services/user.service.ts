import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../core/models/user.model';
import * as jwt_decode from "jwt-decode";
import { environment } from '../env/environment';


@Injectable()
export class UsersService {

    constructor(private http: HttpClient) { }


    login(): Observable<User> {
        return this.http.post<User>(`${environment.appApi.baseUrl}/auth/login`, {
            email: 'caio@mum.edu',
            password: '123'
        });
    }

    register(user:User){
        return this.http.post(`auth/users`,user);

        
    }
}
