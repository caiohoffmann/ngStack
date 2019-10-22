import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../core/models/user.model';
import * as jwt_decode from "jwt-decode";
import { environment } from '../env/environment';
import { UsersStoreFacade } from '../store/users/users.store-facade';
import { reject } from 'q';


@Injectable()
export class UsersService {

    constructor(private http: HttpClient, private userStoreFacade: UsersStoreFacade) { }


    login(user: User): Observable<User> {
        return this.http.post<User>(`${environment.appApi.baseUrl}/auth/login`, user);
    }

    register(user: User) {
        return this.http.post(`${environment.appApi.baseUrl}/users`, user);
    }

    getUserFromToken(user: User): User {
        const prom = this.userStoreFacade.getToken();
        const u = jwt_decode(user.token);
        u.token = user.token;
        return u;
    }

    create(user: User): Observable<any> {
        return this.http.post<User>(`${environment.appApi.baseUrl}/auth/signin`, {
            'email': user.email,
            password: user.password,
            name: user.name
        });
    }

    update(user: User): Observable<any> {
        return this.http.put<User>(`${environment.appApi.baseUrl}/users/${user.id}`, user);
    }

    destroy(id: number): Observable<any> {
        return this.http.delete(`${environment.appApi.baseUrl}/user/:${id}`);
    }
}
