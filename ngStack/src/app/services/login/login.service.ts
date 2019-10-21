import { HttpClient } from '@angular/common/http';
import { Injectable ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apipath:any ="http://localhost:3000"
  constructor(private http:HttpClient) { }
  validateLogin(username,password){
    console.log(`username ${username} password ${password}`)

    return this.http.post(`${this.apipath}/users/login`,{
      username:username,
      password:password
    });
}
// http://localhost:3000/users/
add(username,password,email){
  return this.http.post(`${this.apipath}/user/post`,{
    username:username,
    password:password,
    email:email
  });
}
emitter=new EventEmitter();
emitValue(value){
  this.emitter.emit(value);
}
}
