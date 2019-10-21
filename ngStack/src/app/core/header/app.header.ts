import { UsersStoreFacade } from 'src/app/store/users/users.store-facade';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styles: ['./app.header.css']
})
export class AppHeaderComponent implements OnInit {
  user: Observable<User>;
  constructor(private userFacade: UsersStoreFacade) {

  }
  ngOnInit() {
    this.user = this.userFacade.getUser();
    this.user.subscribe(t => console.dir(t));
  }
}
