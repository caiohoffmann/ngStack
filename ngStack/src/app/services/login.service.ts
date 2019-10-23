import { User } from './../core/models/user.model';


import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//


export class LoginService {
  private currentUserSubjet: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubjet = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentuser')));
    this.currentUser = this.currentUserSubjet.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubjet.value;
  }

  validateLogin(username: string, password: string) {

    return this.http.post<any>(`${environment.appApi.baseUrl}/auth/login`, {
      email: username,
      password: password
    }).pipe(map(user => {
      if (user && user.token) {
        //localStorage.setItem('currentUser', JSON.stringify(user.result));
        this.currentUserSubjet.next(user);

      }
      return user;
    }));
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubjet.next(null);
  }
  // http://localhost:3000/users/
  add(username, password, email) {
    return this.http.post(`${environment.appApi.baseUrl}/users`, {
      username: username,
      password: password,
      email: email
    });
  }
  emitter = new EventEmitter();
  emitValue(value) {
    this.emitter.emit(value);
  }
}
