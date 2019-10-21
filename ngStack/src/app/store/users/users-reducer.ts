import { User } from '../../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  logedIn, login,
} from './users-actions';


export interface State {
  user: User
}
export const initialState: State = {
  user: null
};

export const userReducer = createReducer<State>(
  initialState,
  on(login, (state) =>
    ({ ...state, user: state.user })),
  on(logedIn, (state, { user }) =>
    ({ ...state, user: user })
  )
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