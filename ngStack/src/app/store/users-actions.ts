import { createAction, props } from '@ngrx/store';
import { User } from '../core/models/user.model';
import { UserEventTypes } from '../core/models/user.events';

export const login = createAction(
  UserEventTypes.login,
  props<{ user: User }>()
);

export const logedIn = createAction(
  UserEventTypes.login,
  props<{ user: User }>()
);

// export const loadAll = createAction(
//   '[Users] Load all'
// );

// export const load = createAction(
//   '[Users] Load',
//   props<{ id: number }>()
// );

// export const create = createAction(
//   '[Users] Create',
//   props<{ user: User }>()
// );

// export const update = createAction(
//   '[Users] Update',
//   props<{ user: Partial<User> }>()
// );

// export const remove = createAction(
//   '[Users] Remove',
//   props<{ id: number }>()
// );

// export const loadAllSuccess = createAction(
//   '[Users] Load all success',
//   props<{ user: User[] }>()
// );

// export const loadSuccess = createAction(
//   '[Users] Load success',
//   props<{ 'User': User }>()
// );

// export const createSuccess = createAction(
//   '[Users] Create success',
//   props<{ user: User }>()
// );

// export const updateSuccess = createAction(
//   '[Users] Update success',
//   props<{ user: Partial<User> }>()
// );


// export const removeSuccess = createAction(
//   '[Users] Remove success',
//   props<{ id: number }>()
// );


// export const failure = createAction(
//   '[Users] Failure',
//   props<{ err: { concern: 'CREATE' | 'PATCH', error: any } }>()
// );
