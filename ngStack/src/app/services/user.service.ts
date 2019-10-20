import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../core/models/user.model';
import { environment } from '../env/environment';


@Injectable()
export class UsersService {

    constructor(private http: HttpClient) { }


    login(user: User): Observable<User> {
        return this.http.post<User>(`${environment.appApi.baseUrl}/auth/login`, {
            email: user.email,
            password: user.password
        });
    }

    index(): Observable<User[]> {
        return this.http
            .get<User[]>(`${environment.appApi.baseUrl}/Users`);
    }

    show(conactId: number): Observable<User> {
        return this.http
            .get<User>(`${environment.appApi.baseUrl}/Users/${conactId}`);
    }

    create(User: User): Observable<User> {
        return this.http.post<User>(`${environment.appApi.baseUrl}/Users`, User);
    }

    update(User: Partial<User>): Observable<User> {
        return this.http.patch<User>(`${environment.appApi.baseUrl}/Users/${User.id}`, User);
    }


    destroy(id: number): Observable<User> {
        return this.http.delete<User>(`${environment.appApi.baseUrl}/Users/${id}`);
    }

}
