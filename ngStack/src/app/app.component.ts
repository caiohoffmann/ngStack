import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { UsersStoreFacade } from './store/users.store-facade';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <p>{{user | async | json}}</p>
      <button (click)="login()">Log in</button>
    </div>
  `,
  styles: ['./app.component.css']
})
export class AppComponent {
  user: Observable<User>;
  constructor(private usersStoreFacade: UsersStoreFacade) {
    this.user = usersStoreFacade.getUser();
  }
  login() {
    this.usersStoreFacade.login({
      email: "caio@mum.edu",
      password: "123"
    });
  }
}
