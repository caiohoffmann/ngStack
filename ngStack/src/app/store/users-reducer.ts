import { User } from '../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  logedIn, login
} from './users-actions';


export interface State {
  user: User;
}
export const initialState: State = {
  user: null
};

export const reducer = createReducer<State>(
  initialState,
  on(logedIn, state =>
    ({ ...state, users: state.user })),
  on(logedIn, (state, { users }) =>
    ({ ...state, user: state.user })
  ),
  // on(createSuccess, (state, { user }) =>
  //   usersAdapter.addOne(user, state)
  // ),
  // on(updateSuccess, (state, { user }) =>
  //   usersAdapter.updateOne({ id: user.id, changes: user }, state)
  // ),
  // on(removeSuccess, (state, { id }) =>
  //   usersAdapter.removeOne(id, state)
  // )
);

export function userReducer(state, action) {
  return reducer(state, action);
}