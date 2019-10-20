import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { UsersStoreFacade } from './store/users.store-facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent {
  user: Observable<User>;
  constructor(private usersStoreFacade: UsersStoreFacade) {
    this.user = usersStoreFacade.getUser();
  }
}
