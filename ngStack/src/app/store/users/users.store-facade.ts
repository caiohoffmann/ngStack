import { Injectable } from '@angular/core';
import { AppState } from '../reducer';
import { select, Store } from '@ngrx/store';

import { User } from '../../core/models/user.model';
import { logedIn, login, create, update, remove, logout } from './users-actions';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersStoreFacade {

  constructor(private store: Store<AppState>) { }

  login(user: User) {
    this.store.dispatch(login({ user }));
  }

  getUser() {
    return this.store.pipe(
      select('user'),
      map(u => u.user)
    );
  }

  getToken() {
    return this.store.pipe(
      select('user'),
      map(us => {
        return us.token
      })
    )
  }

  logedIn(user: User) {
    this.store.dispatch(logedIn({ user: user, token: user.token }));
  }

  create(user: User) {
    this.store.dispatch(create({ user }))
  }
  updateContact(user: User) {
    this.store.dispatch(update({ user }));
  }

  deleteContact(id: number) {
    this.store.dispatch(remove({ id }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
