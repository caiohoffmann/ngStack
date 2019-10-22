import { UsersStoreFacade } from 'src/app/store/users/users.store-facade';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styles: ['./app.header.css']
})
export class AppHeaderComponent implements OnInit {
  user: Observable<User>;
  constructor(private userFacade: UsersStoreFacade, private userService: UsersService) {

  }
  ngOnInit() {
    this.user = this.userFacade.getUser();
    this.user.subscribe(t => {
      if (!t) {
        const token = localStorage.getItem('currUserToken');

        const de = this.userService.getUserFromToken({ token: token, email: '', password: '' });
        this.userFacade.logedIn(de);
      }
    });
  }
  logout() {
    //remove user from store
    this.userFacade.logout();
  }
}
