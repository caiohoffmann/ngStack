import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map, pluck,
  startWith,
  switchMap,
  mergeMap
} from 'rxjs/operators';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/user.service';
import {
  login,
  logedIn
  // create,
  // createSuccess,
  // failure,
  // load,
  // loadAll,
  // loadAllSuccess,
  // loadSuccess,
  // remove,
  // removeSuccess,
  // update,
  // updateSuccess
} from './users-actions';


/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class UsersEffects {

  @Effect()
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login), /* When action is dispatched */
    /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
    /* 'Contacts Reducers' will take care of the rest */
    switchMap(() => this.usersService.login().pipe(
      map(user => {
        return logedIn({ user })
      })
    )),
  ));


  // load$ = createEffect(() => this.actions$.pipe(
  //   ofType(load),
  //   pluck('id'),
  //   switchMap(id => this.usersService.show(id).pipe(
  //     map(contact => loadSuccess({ contact }))
  //   ))
  // ));


  // create$ = createEffect(() => this.actions$.pipe(
  //   ofType(create),
  //   pluck('contact'),
  //   switchMap(contact => this.usersService.create(contact).pipe(
  //     map(contact => createSuccess({ contact })),
  //     catchError(err => {
  //       alert(err.message);
  //       return of(failure({ err: { concern: 'CREATE', error: err } }));
  //     })
  //   ))
  // ));


  // update$ = createEffect(() => this.actions$.pipe(
  //   ofType(update),
  //   pluck('contact'),
  //   exhaustMap(contact => this.usersService.update(contact).pipe(
  //     map(contact => updateSuccess({ contact }))
  //   ))
  // ));

  // destroy$ = createEffect(() => this.actions$.pipe(
  //   ofType(remove),
  //   pluck('id'),
  //   switchMap(id => this.usersService.destroy(id).pipe(
  //     pluck('id'),
  //     map(id => removeSuccess({ id }))
  //   ))
  // ));

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

}
