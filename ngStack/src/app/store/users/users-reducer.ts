import { User } from '../../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  logedIn, login, createSuccess, updateSuccess, removeSuccess, logout,
} from './users-actions';


export interface State {
  user: User,
  token: string
}
export const initialState: State = {
  user: null,
  token: null
};

export const userReducer = createReducer<State>(
  initialState,
  on(logedIn, (state, { user, token }) =>
    ({ ...state, user: user, token: token })
  ),
  on(createSuccess, (state, { user }) =>
    ({ ...state, user: user, token: user.token })
  ),
  on(updateSuccess, (state, { user }) =>
    ({ ...state, user: user, token: user.token })
  ),
  on(removeSuccess, (state, { id }) =>
    ({ ...state, user: null, token: null })
  ),
  on(logout, (state) =>
    ({ ...state, user: null, token: null }))
);