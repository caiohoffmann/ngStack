import { Injectable } from '@angular/core';
import * as fromRoot from './index';
import { select, Store } from '@ngrx/store';

import { User } from '../core/models/user.model';
import { logedIn, login } from './users-actions';

@Injectable()
export class UsersStoreFacade {

  constructor(private store: Store<fromRoot.UsersState>) { }

  login(user: User) {
    this.store.dispatch(login({ user }));
  }

  logedIn(users: User[]) {
    this.store.dispatch(logedIn({ users }));
  }

  // updateContact(contact: User) {
  //   this.store.dispatch(update({ contact }));
  // }

  // deleteContact(id: number) {
  //   this.store.dispatch(remove({ id }));
  // }
}
